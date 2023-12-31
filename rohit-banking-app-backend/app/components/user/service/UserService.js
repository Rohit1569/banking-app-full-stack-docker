const userConfig = require("../../../model-config/userConfig");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const { preloadAssociations } = require("../../../sequelize/association");
const { startTransaction } = require("../../../sequelize/transaction");
const {
  parseFilterQueries,
  parseLimitAndOffset,
  parseSelectFields,
} = require("../../../utils/request");
const accountConfig = require("../../../model-config/accountConfig");
const transactionConfig = require("../../../model-config/transactionConfig");

class UserService {
  constructor() { }

  associationMap = {
    account: {
      model: accountConfig.model,
      as: "account",
      include: {
        model: transactionConfig.model,
        as: "transaction"
      }
    },
  };

  async createUser(settingsConfig, body) {
    const t = await startTransaction();
    try {
      const logger = settingsConfig.logger;
      logger.info(`[UserService] : Inside createUser`);

      let hashedPassword = await bcrypt.hash(body.password, 12);
      body.id = uuidv4();
      body.isAdmin = false;
      body.password = hashedPassword;
      console.log(body);
      const data = await userConfig.model.create(body, { transaction: t });
      await t.commit();
      return data;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  // async getAll(settingsConfig, query) {
  //   const transaction = await startTransaction()
  //   try {
  //     const logger = settingsConfig.logger;
  //     logger.info(`[UserService] : Inside getAllUsers`);
  //     let selectArray = parseSelectFields(query, userConfig.fieldMapping)
  //     if (!selectArray) {
  //       selectArray = Object.values(userConfig.fieldMapping)
  //     }

  //     const includeQuery = query.include || []
  //     let associations = []
  //     if (query.include) {
  //       delete query.include
  //     }

  //     if (includeQuery) {
  //       associations = this.createAssociation(includeQuery, selectArray);
  //     }
  //     const { count, rows } = await userConfig.model.findAndCountAll({

  //       attributes: selectArray,
  //       ...parseFilterQueries(query, userConfig.filters),
  //       ...preloadAssociations(associations),
  //       ...parseLimitAndOffset(query),
  //       transaction,
  //     })

  //     await transaction.commit()
  //     console.log(associations, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
  //     return { count, rows }
  //   } catch (error) {
  //     await transaction.rollback()
  //     throw error
  //   }
  // }


  async getAllUsers(settingsConfig, queryParams) {
    const t = await startTransaction();
    try {
      const logger = settingsConfig.logger;
      logger.info(`[UserService] : Inside getAllUsers`);

      const includeQuery = queryParams.include || [];
      let associations = [];
      const attributesToReturn = {
        id: userConfig.fieldMapping.id,
        name: userConfig.fieldMapping.name,
        age: userConfig.fieldMapping.age,
        gender: userConfig.fieldMapping.gender,
        username: userConfig.fieldMapping.username,
        netWorth: userConfig.fieldMapping.netWorth,
        email: userConfig.fieldMapping.email
      };
      let selectArray = parseSelectFields(queryParams, attributesToReturn);
      if (!selectArray) {
        selectArray = Object.values(attributesToReturn);
      }
      if (includeQuery) {
        associations = this.createAssociation(includeQuery, selectArray);
      }
      const data = await userConfig.model.findAndCountAll({
        transaction: t,
        ...parseFilterQueries(queryParams, userConfig.filters),
        attributes: selectArray,
        ...parseLimitAndOffset(queryParams),
        ...preloadAssociations(associations),
      });
      await t.commit();
      return data;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  async getUserById(settingsConfig, userId, queryParams) {
    const t = await startTransaction();
    try {
      const logger = settingsConfig.logger;
      logger.info(`[UserService] : Inside getUserById`);

      const includeQuery = queryParams.include || [];
      let associations = [];
      const attributesToReturn = {
        id: userConfig.fieldMapping.id,
        name: userConfig.fieldMapping.name,
        age: userConfig.fieldMapping.age,
        gender: userConfig.fieldMapping.gender,
        username: userConfig.fieldMapping.username,
        netWorth: userConfig.fieldMapping.netWorth,
      };
      let selectArray = parseSelectFields(queryParams, attributesToReturn);
      if (!selectArray) {
        selectArray = Object.values(attributesToReturn);
      }
      if (includeQuery) {
        associations = this.createAssociation(includeQuery, selectArray);
      }
      // console.log(">>>>>>>>>>>",parseFilterQueries(queryParams, userConfig.filters,{id:userId}))
      const data = await userConfig.model.findAll({
        ...parseFilterQueries(queryParams, userConfig.filters, { id: userId }),
        attributes: selectArray,
        transaction: t,
        ...preloadAssociations(associations),
      });
      await t.commit();
      return data;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  // async updateUser(settingsConfig, userId, body) {
  //   const t = await startTransaction();
  //   try {
  //     const logger = settingsConfig.logger;
  //     logger.info(`[UserService] : Inside updateUser`);

  //     let { parameter, newValue } = body;
  //     let up = undefined;
  //     switch (parameter) {
  //       case "name":
  //         up = await userConfig.model.update(
  //           { name: newValue },
  //           { where: { id: userId }, transaction: t }
  //         );
  //         await t.commit();
  //         return up;
  //       case "age":
  //         up = await userConfig.model.update(
  //           { age: newValue },
  //           { where: { id: userId }, transaction: t }
  //         );
  //         await t.commit();
  //         return up;
  //       case "gender":
  //         up = await userConfig.model.update(
  //           { gender: newValue },
  //           { where: { id: userId }, transaction: t }
  //         );
  //         await t.commit();
  //         return up;
  //       default:
  //         throw new Error("Invalid Parameter");
  //     }
  //   } catch (error) {
  //     await t.rollback();
  //     throw error;
  //   }
  // }

  async updateUser(settingsConfig, userId, body) {
    const t = await startTransaction();
    try {
      const logger = settingsConfig.logger;
      logger.info(`[UserService] : Inside updateUser`);
      let a = await userConfig.model.update(body, {
        where: { id: userId },
        transaction: t,
      });
      console.log(a);
      t.commit();

      return a;

    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  async deleteUser(settingsConfig, userId) {
    const t = await startTransaction();
    try {
      const logger = settingsConfig.logger;
      logger.info(`[UserService] : Inside deleteUser`);

      let deleted = await userConfig.model.destroy({
        where: {
          id: userId,
        },
        transaction: t,
      });
      await t.commit();
      return deleted;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  async getNetworth(settingsConfig, userId) {
    const t = await startTransaction();
    try {
      const logger = settingsConfig.logger;
      logger.info(`[UserService] : Inside getNetworth`);

      await this.updateNetWorth(settingsConfig, userId)

      let myUser = await userConfig.model.findAll({
        where: { id: userId },
        attributes: ["net_worth"],
      });
      await t.commit();
      return myUser;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  async updateNetWorth(settingsConfig, userId) {
    const t = await startTransaction();
    try {
      const logger = settingsConfig.logger;
      logger.info(`[UserService] : Inside updateNetWorth`);

      let total = 0;
      let [myUser] = await userConfig.model.findAll({
        transaction: t,
        where: { id: userId },
        attributes: ["net_worth"],
        include: { model: accountConfig.model, as: "account", attributes: ["account_balance"] },
      });
      myUser.account.forEach((element) => {
        total = total + element.dataValues.account_balance;
      });
      let up = await userConfig.model.update(
        { netWorth: total },
        { where: { id: userId }, transaction: t }
      );
      if ([up] == 0) {
        throw new Error("could not update networth");
      }
      let returnUser = await userConfig.model.findAll({
        transaction: t,
        where: { id: userId },
      });
      await t.commit();
      return returnUser;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  async getUserByUsername(settingsConfig, username) {
    const t = await startTransaction();
    try {
      const logger = settingsConfig.logger;
      logger.info(`[UserService] : Inside getUserByUsername`);

      const data = await userConfig.model.findAll({
        transaction: t,
        where: { username: username },
        paranoid: false
      });
      await t.commit();
      return data;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  async authenticateUser(settingsConfig, username, password) {
    try {
      const logger = settingsConfig.logger;
      logger.info(`[UserService] : Inside authenticateUser`);

      let [myUser] = await this.getUserByUsername(settingsConfig, username);
      if (myUser == undefined) {
        throw new Error("user Not Found");
      }

      let check = await bcrypt.compare(password, myUser.dataValues.password);
      if (!check) {
        throw new Error("authentication failed");
      }

      let myobj = {
        userId: myUser.dataValues.id,
        username: myUser.dataValues.username,
        isAdmin: myUser.dataValues.isAdmin,
      };
      let token = jwt.sign(myobj, process.env.JWT_SECRET_KEY, {
        expiresIn: 60 * 60,
      });

      return [myUser, token];
    } catch (error) {
      throw error;
    }
  }

  createAssociation(includeQuery, selectArray) {
    let associations = [];
    if (!Array.isArray(includeQuery)) {
      includeQuery = [includeQuery];
    }
    if (includeQuery?.includes(userConfig.associations.accountFilter)) {
      associations.push(this.associationMap.account);
    }

    return associations;
  }

  async verifyByUsername(settingsConfig, payload, username) {
    return payload.username === username;
  }


  async checkingPassword(settingsConfig, username, oldPassword, newPassword) {
    const t = await startTransaction();
    try {
      const logger = settingsConfig.logger;
      logger.info(`[UserService] : Inside checkingPassword`);



      let [myUser] = await this.getUserByUsername(settingsConfig, username);
      if (myUser == undefined) {
        throw new Error("user Not Found");
      }

      let check = await bcrypt.compare(oldPassword, myUser.dataValues.password);
      if (!check) {
        throw new Error("authentication failed");
      }
      const hashpassword = await bcrypt.hash(newPassword, 12);
      let updatePassword = await userConfig.model.update({ password: hashpassword }, { where: { id: await myUser.dataValues.id }, transaction: t, })
      t.commit()
      return updatePassword
    } catch (error) {
      t.rollback()
      throw error
    }
  }


  async resetPassword(settingsConfig, username, newPassword) {
    const t = await startTransaction();
    try {
      const logger = settingsConfig.logger;
      logger.info(`[UserService] : Inside checkingPassword`);



      let [myUser] = await this.getUserByUsername(settingsConfig, username);
      if (myUser == undefined) {
        throw new Error("user Not Found");
      }
      const hashpassword = await bcrypt.hash(newPassword, 12);
      let updatePassword = await userConfig.model.update({ password: hashpassword }, { where: { id: await myUser.dataValues.id }, transaction: t, })
      t.commit()
      return updatePassword
    } catch (error) {
      t.rollback()
      throw error
    }
  }

  // async resetPassword(settingsConfig, email, newPassword) {
  //   const t = await startTransaction();
  //   try {
  //     const logger = settingsConfig.logger;
  //     logger.info(`[UserService] : Inside ResetPassword`);
  //     let myUser = await this.getUserByUsername(settingsConfig, username);
  //     const hashpassword = await bcrypt.hash(newPassword, 12);
  //     let updatePassword = await userConfig.model.update({ password: hashpassword }, { where: { email: email }, transaction: t, })
  //     t.commit()
  //     return updatePassword
  //   } catch (error) {
  //     t.rollback()
  //     throw error
  //   }
  // }

  async sendEmail({ recipient_email, OTP }) {

    var transporter = await nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD,
      },
    });

    const mail_configs = {
      from: process.env.MY_EMAIL,
      to: recipient_email,
      subject: "KODING 101 PASSWORD RECOVERY",
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
    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log(error);
        return alert({ message: `An error has occured` });
      }
      return alert({ message: "Email sent succesfuly" });
    });
  }
}
module.exports = UserService;
