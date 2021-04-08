const fs = require("fs");
const { produceResult } = require("./helpers");

class ReviewBuilder {
  buildReviewsSync() {
    const products = JSON.parse(
      fs.readFileSync("./data/products.json", "utf-8")
    );
    const reviews = JSON.parse(fs.readFileSync("./data/reviews.json", "utf-8"));
    const users = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));
    return produceResult({ products, reviews, users });
  }

  buildReviewsCallbacks(cb) {
    fs.readFile("./data/products.json", "utf8", (err, products) => {
      if (err) throw err;
      fs.readFile("./data/reviews.json", "utf8", (err, reviews) => {
        if (err) throw err;
        fs.readFile("./data/users.json", "utf8", (err, users) => {
          if (err) throw err;
          products = JSON.parse(products);
          reviews = JSON.parse(reviews);
          users = JSON.parse(users);
          cb(produceResult({ products, reviews, users }));
        });
      });
    });
  }

  /// THE easy way out...

  // buildReviewsPromises() {
  //   return new Promise((resolve) => {
  //     this.buildReviewsCallbacks(resolve);
  //   }).catch("error");
  // }

  // async buildReviewsAsyncAwait() {
  //   let result = await this.buildReviewsSync();
  //   return result;
  // }

  /// To be Extra...
  buildReviewsPromises() {
    return new Promise((resolve) => {
      const products = JSON.parse(
        fs.readFileSync("./data/products.json", "utf-8")
      );
      const reviews = JSON.parse(
        fs.readFileSync("./data/reviews.json", "utf-8")
      );
      const users = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));

      resolve(produceResult({ products, reviews, users }));
    });
  }

  async buildReviewsAsyncAwait() {
    const products = await JSON.parse(
      fs.readFileSync("./data/products.json", "utf-8")
    );
    const reviews = await JSON.parse(
      fs.readFileSync("./data/reviews.json", "utf-8")
    );
    const users = await JSON.parse(
      fs.readFileSync("./data/users.json", "utf-8")
    );

    return produceResult({ products, reviews, users });
  }
}

module.exports = ReviewBuilder;
