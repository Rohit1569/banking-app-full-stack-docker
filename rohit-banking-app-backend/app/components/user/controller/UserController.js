const { StatusCodes } = require("http-status-codes")
const UserService = require("../service/UserService");
const { response } = require("express");
const nodemailer = require("nodemailer");
const { checkJwtHS256 } = require("../../../middleware/authService");
const { EmptyResultError } = require("sequelize");
require('dotenv').config();

class UserController {
    constructor() {
        this.userService = new UserService()
    }

    async forgetPassword(settingsConfig, req, res, next) {
        // const { email ,OTP} = req.body || 'mpty'
        // let OTP = req.body
        // console.log(req.body)
        //     .then((response) => res.send(response.message))
        // this.sendEmail(email, req.body)
        //     .catch((error) => console.log("internal server error", email, "otppppppppppp", error));
        try {

            let response = await this.sendEmail(req.body.recipient_email, req.body.OTP)
            console.log(req.body, "ffffffffffffffff")
            return res.status(StatusCodes.OK).json({ response })
        } catch (error) {
            next(error)
        }

    };


    async login(settingsConfig, req, res, next) {
        try {
            const logger = settingsConfig.logger;
            logger.info(`[UserController] : Inside login`);

            const { username, password } = req.body;
            const [user, token] = await this.userService.authenticateUser(settingsConfig, username, password);
            res.set(process.env.AUTH_COOKIE_NAME, token)
            res.cookie(process.env.AUTH_COOKIE_NAME, token);
            res.status(StatusCodes.OK).json(user)
        } catch (error) {
            next(error)
        }
    }
    async logout(settingsConfig, req, res, next) {
        try {
            const logger = settingsConfig.logger;
            logger.info(`[UserController] : Inside logout`);

            res.cookie(process.env.AUTH_COOKIE_NAME, "", { expires: new Date(Date.now()) });
            res.status(StatusCodes.OK).json("Logged out")
        } catch (error) {
            next(error)
        }
    }


    async checkPassword(settingsConfig, req, res, next) {
        try {
            const logger = settingsConfig.logger;
            logger.info(`[UserController] : Inside checkPassword`);

            const { username, oldPassword, newPassword } = req.body
            if (oldPassword.length == 0) {
                throw new Error("plz enter old password")
            }
            if (newPassword.length == 0) {
                throw new Error("plz enter new password")
            }
            const payload = checkJwtHS256(settingsConfig, req, res, next)
            if (payload.username != username) {
                throw new Error("unauthorized")
            }
            const newpssd = await this.userService.checkingPassword(settingsConfig, username, oldPassword, newPassword)
            if (newpssd == 0) {
                throw new Error("cannot update password")
            }
            res.status(StatusCodes.OK).json("updated password")
            return

        } catch (error) {
            next(error)
        }
    }


    async resetPassword(settingsConfig, req, res, next) {
        try {
            const logger = settingsConfig.logger;
            logger.info(`[UserController] : Inside resetPassword`);

            const { username, newPassword } = req.body
            console.log(req.body.username, "sxxxxxxx");
            if (newPassword.length == 0) {
                throw new Error("plz enter new password")
            }
            const newpssd = await this.userService.resetPassword(settingsConfig, username, newPassword)
            if (newpssd == 0) {
                throw new Error("cannot update password")
            }
            res.status(StatusCodes.OK).json("updated password")
            return

        } catch (error) {
            next(error)
        }
    }

    // async forgetPassword(req, res) {
    //     try {
    //        email = req.body
    //         OTP = req.body
    //         const result = await this.userService.sendEmail(email, OTP)
    //         res.status(StatusCodes.OK).json(result)
    //     }
    //     catch (error) {
    //         console.log("error");


    //     }


    // }

    async createUser(settingsConfig, req, res, next) {
        try {
            const logger = settingsConfig.logger;
            logger.info(`[UserController] : Inside createUser`);

            const user = await this.userService.getUserByUsername(settingsConfig, req.body.username)
            if (user.length != 0) {
                throw new Error("username Already Taken")
            }
            const newUser = await this.userService.createUser(settingsConfig, req.body)

            res.status(StatusCodes.CREATED).json(newUser)
            return
        } catch (error) {
            next(error)
        }
    }

    // async getAllUsers(settingsConfig, req, res, next) {
    //     try {
    //         const logger = settingsConfig.logger;
    //         logger.info(`[UserController] : Inside getAllUsers`);

    //         const queryParams = req.query
    //         const { count, rows } = await this.userService.getAllUsers(settingsConfig, queryParams)
    //         res.set('X-Total-Count', count)
    //         res.status(StatusCodes.OK).json(rows)
    //         return
    //     } catch (error) {
    //         next(error)
    //     }
    // }
    async getAllUsers(settingsConfig, req, res, next) {
        try {
            const logger = settingsConfig.logger;
            logger.info(`[UserController] : Inside getAllUsers`);

            const query = req.query
            const { count, rows } = await this.userService.getAllUsers(settingsConfig, query)
            res.set('X-Total-Count', count)
            res.status(StatusCodes.ACCEPTED).json(rows)
            return
        } catch (error) {
            next(error)
        }
    }


    async getUserById(settingsConfig, req, res, next) {
        try {
            const logger = settingsConfig.logger;
            logger.info(`[UserController] : Inside getUserById`);

            const { userId } = req.params
            const user = await this.userService.getUserById(settingsConfig, userId, req.query)
            res.status(StatusCodes.OK).json(user)
            return
        } catch (error) {
            next(error)
        }
    }

    // async updateUser(settingsConfig, req, res, next) {
    //     try {
    //         const logger = settingsConfig.logger;
    //         logger.info(`[UserController] : Inside updateUser`);

    //         const { userId } = req.params
    //         const user = await this.userService.getUserById(settingsConfig, userId, req.query)
    //         if (user.length == 0) {
    //             throw new Error("User Not Found!")
    //         }

    //         const [userUpdated] = await this.userService.updateUser(settingsConfig, userId, req.body)
    //         if (userUpdated == 0) {
    //             throw new Error("Could Not Update user")
    //         }
    //         res.status(StatusCodes.OK).json("User Updated")
    //         return
    //     } catch (error) {
    //         next(error)
    //     }
    // }
    async updateUser(settingsConfig, req, res, next) {
        try {
            const logger = settingsConfig.logger;
            logger.info(`[UserController] : Inside updateUser`);

            const { userId } = req.params
            const user = await this.userService.getUserById(settingsConfig, userId, req.query)
            if (user.length == 0) {
                throw new Error("User Not Found!")
            }

            const [userToBeUpdated] = await this.userService.updateUser(settingsConfig, userId, req.body)
            console.log(userToBeUpdated);
            if (userToBeUpdated == 0) {
                throw new Error("Could Not Update user")
            }
            res.status(StatusCodes.OK).json("user updated sucessfully")
            return
        } catch (error) {
            next(error)
        }
    }

    async deleteUser(settingsConfig, req, res, next) {
        try {
            const logger = settingsConfig.logger;
            logger.info(`[UserController] : Inside deleteUser`);

            const { userId } = req.params
            const user = await this.userService.getUserById(settingsConfig, userId, req.query)
            if (user.length == 0) {
                throw new Error("User Not Found!")
            }

            const userDeleted = await this.userService.deleteUser(settingsConfig, userId)
            if (userDeleted == 0) {
                throw new Error("Could Not Delete user")
            }
            res.status(StatusCodes.OK).json("user Deleted Sucessfully")
            return
        } catch (error) {
            next(error)
        }
    }

    async verifyByUsername(settingsConfig, req, res, next) {
        try {
            const logger = settingsConfig.logger;
            logger.info(`[UserController] : Inside verifyByUsername`);
            const { username } = req.body
            if (!username) {
                return res.status(200).json({ result: false })
            }
            const payload = checkJwtHS256(settingsConfig, req, res, next)
            if (!payload) {
                return res.status(200).json({ result: false })
            }
            const response = await this.userService.verifyByUsername(settingsConfig, payload, username)
            return res.status(StatusCodes.OK).json({ result: response })
        } catch (error) {
            return res.status(StatusCodes.OK).json({ result: response })
        }
    }

    async getNetworth(settingsConfig, req, res, next) {
        try {
            const logger = settingsConfig.logger;
            logger.info(`[UserController] : Inside getNetworth`);

            const { userId } = req.params
            validateUuid(userId)

            const user = await this.userService.getUserById(settingsConfig, userId, req.query)
            if (user.length == 0) {
                throw new Error("User Not Found!")
            }

            let networth = await this.userService.getNetworth(settingsConfig, userId, req.query)

            res.status(StatusCodes.OK).json(networth)
            return
        } catch (error) {
            next(error)
        }
    }
    async verifyByUsername(settingsConfig, req, res, next) {
        try {
            const logger = settingsConfig.logger;
            logger.info(`[UserController] : Inside verifyByUsername`);
            const { username } = req.body
            if (!username) {
                return res.status(200).json({ result: false })
            }
            const payload = checkJwtHS256(settingsConfig, req, res, next)
            if (!payload) {
                return res.status(200).json({ result: false })
            }
            const response = await this.userService.verifyByUsername(settingsConfig, payload, username)
            return res.status(StatusCodes.OK).json({ result: response })
        } catch (error) {
            return res.status(StatusCodes.OK).json({ result: response })
        }
    }

    async sendEmail(recipient_email, OTP) {
        console.log(recipient_email, "REEEEEEEEE", OTP, "OTPPPPPPPP")
        return new Promise((resolve, reject) => {
            var transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: 'helpdeskbankingapp@gmail.com',
                    pass: 'pccp pfrk vwwe rsvy',
                },
                // service: 'gmail',
                // host: 'smtp.gmail.com',
                // auth: {
                //     user: 'your gmail here',
                //     pass: 'your app generated password here',
                // },
            });

            const mail_configs = {
                from: 'helpdeskbankingapp@gmail.com',
                to: recipient_email,
                subject: "RohitBankingApp 101 PASSWORD RECOVERY",
                html: `<!DOCTYPE html>
<html lang="en" >
<head>
  <meta charset="UTF-8">
  <title>CodePen - OTP Email Template</title>
  

</head>
<body>
<!-- partial:index.partial.html -->
<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Koding 101</a>
    </div>
    <p style="font-size:1.1em">Hi,</p>
    <p>Thank you for choosing Koding 101. Use the following OTP to complete your Password Recovery Procedure. OTP is valid for 5 minutes</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
    <p style="font-size:0.9em;">Regards,<br />Koding 101</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>Koding 101 Inc</p>
      <p>1600 Amphitheatre Parkway</p>
      <p>California</p>
    </div>
  </div>
</div>
<!-- partial -->
  
</body>
</html>`,
            };
            console.log(mail_configs, "mailconfigs//////////");
            transporter.sendMail(mail_configs, function (error, info) {
                if (error) {
                    console.log(error);
                    return reject({ message: `An error has occured` });
                }
                return resolve({ message: "Email sent succesfuly" });
            });
        });
    }

    // async forgetPassword(settingsConfig, req, res, next) {
    //     // const { email ,OTP} = req.body || 'mpty'
    //     // let OTP = req.body
    //     // console.log(req.body)
    //     //     .then((response) => res.send(response.message))
    //     // this.sendEmail(email, req.body)
    //     //     .catch((error) => console.log("internal server error", email, "otppppppppppp", error));
    //     try {

    //         let response = await this.sendEmail(req.body, req.body)
    //         return res.status(StatusCodes.OK).json({ response })
    //     } catch (error) {
    //         next(error)
    //     }

    // };



}

module.exports = new UserController()