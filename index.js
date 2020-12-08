// #!/usr/bin/env node ONLY NEED THIS IF YOUre using anything other than a windows pc
const fs = require('fs');
const {lstat} = fs.promises;

//This is the best solution
fs.readdir(process.cwd(), async (err, filenames) => {
    if (err) {
        throw new Error(err);
    }
    const statPromises = filenames.map(filename => {
        return lstat(filename);
    });

    const allStats = await Promise.all(statPromises);
    for (let stats of allStats) {
        const index = allStats.indexOf(stats);
        console.log(filenames[index], stats.isFile());
    }
});


//Method #1
// const lstat = (filename) => {
//     return new Promise((resolve, reject) => {
//         fs.lstat(filename, (err, stats) => {
//             if (err) {
//                 reject(err);
//             }
//             resolve(stats);
//         });
//     });
// };


//SOLUTION 1
// const allStats = Array(filenames.length).fill(null);
// for (let filename of filenames) {
//     const index = filename.indexOf(filename);
//     fs.lstat(filename, (err, stats) => {
//         if (err) {
//             console.log(err);
//         }
//         allStats[index] = stats;
//
//         const ready = allStats.every((stats) => {
//             return stats;
//         });
//         if(ready) {
//             allStats.forEach((stats, index) => {
//                 console.log(filenames[index], stats.isFile());
//             });
//         }
//     });

//Solution #3
// for (let filename of filenames) {
//     try {
//         const stats = await lstat(filename);
//         console.log(filename, stats.isFile());
//     } catch (err) {
//         console.log(err);
//     }
// }

