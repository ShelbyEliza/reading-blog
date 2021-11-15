// const fs = require("fs");
// const { resolve } = require("path");

// // Universal Functions:

// const readDataPromise = (file) => {
//   return new Promise((resolve, reject) => {
//     fs.readFile(file, (err, data) => {
//       if (err) {
//         reject(console.log(err));
//       } else {
//         console.log("Success - readDataPromise.");
//         resolve(data);
//       }
//     });
//   });
// }

// const convertJsonToObjectPromise = (jsonData) => {
//   return new Promise((resolve) => {
//     console.log("Success - convertJsonToObjectPromise.");
//     const objectsData = JSON.parse(jsonData);
//     resolve(objectsData);
//   });
// }

// const convertObjectToJson = (blogObjArray) => {
//   console.log("Success - convertObjectToJson.");
//   const jsonString = JSON.stringify(blogObjArray, null, 4);
//   return jsonString;
// }

// const writeEntry = (jsonString) => {
//   return new Promise((resolve) => {
//     fs.writeFile("data/blog-data.json", jsonString, (err) => {
//       if (err) {
//         console.log("ERROR writing to files");
//       } else {
//         resolve("Done writing files");
//       }
//     });
//   });
// }

// const reverseOrder = (blogObjArray) => {
//   const lastBlog = blogObjArray.length - 1;

//   if (blogObjArray[lastBlog].id == 1) {
//     var reversedResults = blogObjArray;
//   } else {
//     reversedResults = blogObjArray.reverse();
//   }
//   return reversedResults;
// }
