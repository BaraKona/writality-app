export function advancedMerge(main: string, branch: string): string {
	let result = "";
	let mainIndex = 0;
	let branchIndex = 0;

	while (mainIndex < main.length && branchIndex < branch.length) {
		let mainChar = main.charAt(mainIndex);
		let branchChar = branch.charAt(branchIndex);

		if (mainChar === branchChar) {
			result += mainChar;
			mainIndex++;
			branchIndex++;
		} else {
			let mainStart = mainIndex;
			let branchStart = branchIndex;

			while (
				mainChar !== branchChar &&
				mainIndex < main.length &&
				branchIndex < branch.length
			) {
				if (mainChar < branchChar) {
					mainIndex++;
					if (mainIndex < main.length) {
						mainChar = main.charAt(mainIndex);
					}
				} else {
					branchIndex++;
					if (branchIndex < branch.length) {
						branchChar = branch.charAt(branchIndex);
					}
				}
			}

			result += `<span style='color: #F0E68C; text-decoration: line-through;'>${main.slice(
				mainStart,
				mainIndex
			)}</span>`;
			result += `<span style='color: #90EE90;'>${branch.slice(
				branchStart,
				branchIndex
			)}</span>`;
		}
	}

	if (mainIndex < main.length) {
		result += `<span style='color: #F0E68C; text-decoration: line-through;'>${main.slice(
			mainIndex,
			main.length
		)}</span>`;
	}

	if (branchIndex < branch.length) {
		result += `<span style='color: #90EE90;'>${branch.slice(
			branchIndex,
			branch.length
		)}</span>`;
	}

	return result;
}
// export function advancedMerge(main: string, branch: string): string {
// 	let result = "";
// 	let mainIndex = 0;
// 	let branchIndex = 0;

// 	while (mainIndex < main.length && branchIndex < branch.length) {
// 		let mainChar = main.charAt(mainIndex);
// 		let branchChar = branch.charAt(branchIndex);

// 		if (mainChar === branchChar) {
// 			result += mainChar;
// 			mainIndex++;
// 			branchIndex++;
// 		} else {
// 			let mainStart = mainIndex;
// 			let branchStart = branchIndex;

// 			while (
// 				mainChar !== branchChar &&
// 				mainIndex < main.length &&
// 				branchIndex < branch.length
// 			) {
// 				if (mainChar < branchChar) {
// 					mainIndex++;
// 					if (mainIndex < main.length) {
// 						mainChar = main.charAt(mainIndex);
// 					}
// 				} else {
// 					branchIndex++;
// 					if (branchIndex < branch.length) {
// 						branchChar = branch.charAt(branchIndex);
// 					}
// 				}
// 			}

// 			result += `<span style='color: #F0E68C; text-decoration: line-through;'>${main.slice(
// 				mainStart,
// 				mainIndex
// 			)}</span>`;
// 			result += `<span style='color: #90EE90;'>${branch.slice(
// 				branchStart,
// 				branchIndex
// 			)}</span>`;
// 		}
// 	}

// 	if (mainIndex < main.length) {
// 		result += `<span style='color: #F0E68C; text-decoration: line-through;'>${main.slice(
// 			mainIndex,
// 			main.length
// 		)}</span>`;
// 	}

// 	if (branchIndex < branch.length) {
// 		result += `<span style='color: #90EE90;'>${branch.slice(
// 			branchIndex,
// 			branch.length
// 		)}</span>`;
// 	}

// 	return result;
// }
// export function advancedMerge(main: string, branch: string): string {
// 	let result = "";
// 	let mainIndex = 0;
// 	let branchIndex = 0;

// 	while (mainIndex < main.length && branchIndex < branch.length) {
// 		let mainChar = main.charAt(mainIndex);
// 		let branchChar = branch.charAt(branchIndex);

// 		if (mainChar === branchChar) {
// 			result += mainChar;
// 			mainIndex++;
// 			branchIndex++;
// 		} else if (mainChar === "<") {
// 			let mainCloseTagIndex = main.indexOf(">", mainIndex);
// 			let tag = main.substring(mainIndex, mainCloseTagIndex + 1);

// 			if (tag.includes("text-align:center")) {
// 				let mainEndTagIndex = main.indexOf("</p>", mainCloseTagIndex);
// 				let mainBlock = main.substring(mainCloseTagIndex + 1, mainEndTagIndex);
// 				let branchBlock = "";

// 				while (
// 					branch.substring(branchIndex, branch.length).startsWith(mainBlock) ===
// 					false
// 				) {
// 					let branchEndTagIndex = branch.indexOf("</p>", branchIndex);
// 					branchBlock += branch.substring(branchIndex, branchEndTagIndex + 4);
// 					branchIndex = branchEndTagIndex + 4;
// 				}

// 				result += compareCenteredText(mainBlock, branchBlock);
// 				mainIndex = mainEndTagIndex + 4;
// 				branchIndex += mainBlock.length;
// 			} else {
// 				result += tag;
// 				mainIndex = mainCloseTagIndex + 1;
// 			}
// 		} else if (branchChar === "<") {
// 			let branchCloseTagIndex = branch.indexOf(">", branchIndex);
// 			let tag = branch.substring(branchIndex, branchCloseTagIndex + 1);

// 			if (tag.includes("text-align:center")) {
// 				let branchEndTagIndex = branch.indexOf("</p>", branchCloseTagIndex);
// 				let branchBlock = branch.substring(
// 					branchCloseTagIndex + 1,
// 					branchEndTagIndex
// 				);
// 				let mainBlock = "";

// 				while (
// 					main.substring(mainIndex, main.length).startsWith(branchBlock) ===
// 					false
// 				) {
// 					let mainEndTagIndex = main.indexOf("</p>", mainIndex);
// 					mainBlock += main.substring(mainIndex, mainEndTagIndex + 4);
// 					mainIndex = mainEndTagIndex + 4;
// 				}

// 				result += compareCenteredText(mainBlock, branchBlock);
// 				branchIndex = branchEndTagIndex + 4;
// 				mainIndex += branchBlock.length;
// 			} else {
// 				result += tag;
// 				branchIndex = branchCloseTagIndex + 1;
// 			}
// 		} else {
// 			let mainNextIndex = main.indexOf(branchChar, mainIndex);
// 			let branchNextIndex = branch.indexOf(mainChar, branchIndex);
// 			if (
// 				mainNextIndex !== -1 &&
// 				(branchNextIndex === -1 || mainNextIndex < branchNextIndex)
// 			) {
// 				result += `<span style='color: #F0E68C; text-decoration: line-through;'>${main.substring(
// 					mainIndex,
// 					mainNextIndex
// 				)}</span>`;
// 				mainIndex = mainNextIndex;
// 			} else {
// 				result += `<span style='color: #90EE90;'>${branch.substring(
// 					branchIndex,
// 					branchNextIndex
// 				)}</span>`;
// 				branchIndex = branchNextIndex;
// 			}
// 		}
// 	}

// 	if (mainIndex < main.length) {
// 		result += `<span style='color: #F0E68C; text-decoration: line-through;'>${main.substring(
// 			mainIndex,
// 			main.length
// 		)}</span>`;
// 	}

// 	if (branchIndex < branch.length) {
// 		result += `<span style='color: #90EE90;'>${branch.substring(
// 			branchIndex,
// 			branch.length
// 		)}</span>`;
// 	}

// 	return result;
// }

// function compareCenteredText(main: string, branch: string): string {
// 	let result = "";
// 	let mainIndex = 0;
// 	let branchIndex = 0;

// 	while (mainIndex < main.length && branchIndex < branch.length) {
// 		let mainChar = main.charAt(mainIndex);
// 		let branchChar = branch.charAt(branchIndex);

// 		if (mainChar === branchChar) {
// 			result += mainChar;
// 			mainIndex++;
// 			branchIndex++;
// 		} else {
// 			let mainNextIndex = main.indexOf(branchChar, mainIndex);
// 			let branchNextIndex = branch.indexOf(mainChar, branchIndex);

// 			if (
// 				mainNextIndex !== -1 &&
// 				(branchNextIndex === -1 || mainNextIndex < branchNextIndex)
// 			) {
// 				result += `<span style='color: #F0E68C; text-decoration: line-through;'>${main.substring(
// 					mainIndex,
// 					mainNextIndex
// 				)}</span>`;
// 				mainIndex = mainNextIndex;
// 			} else {
// 				result += `<span style='color: #90EE90;'>${branch.substring(
// 					branchIndex,
// 					branchNextIndex
// 				)}</span>`;
// 				branchIndex = branchNextIndex;
// 			}
// 		}
// 	}

// 	if (mainIndex < main.length) {
// 		result += `<span style='color: #F0E68C; text-decoration: line-through;'>${main.substring(
// 			mainIndex,
// 			main.length
// 		)}</span>`;
// 	}

// 	if (branchIndex < branch.length) {
// 		result += `<span style='color: #90EE90;'>${branch.substring(
// 			branchIndex,
// 			branch.length
// 		)}</span>`;
// 	}

// 	return `<p style='text-align:center'>${result}</p>`;
// }

// function compareRichtext(main: string, branch: string): string {
//   let result = "";
//   let mainIndex = 0;
//   let branchIndex = 0;

//   while (mainIndex < main.length && branchIndex < branch.length) {
//       let mainChar = main.charAt(mainIndex);
//       let branchChar = branch.charAt(branchIndex);

//       if (mainChar === branchChar) {
//           result += mainChar;
//           mainIndex++;
//           branchIndex++;
//       } else if (mainChar === "<") {
//           let mainCloseTagIndex = main.indexOf(">", mainIndex);
//           result += main.substring(mainIndex, mainCloseTagIndex + 1);
//           mainIndex = mainCloseTagIndex + 1;
//       } else if (branchChar === "<") {
//           let branchCloseTagIndex = branch.indexOf(">", branchIndex);
//           result += branch.substring(branchIndex, branchCloseTagIndex + 1);
//           branchIndex = branchCloseTagIndex + 1;
//       } else {
//           let mainNextIndex = main.indexOf(branchChar, mainIndex);
//           let branchNextIndex = branch.indexOf(mainChar, branchIndex);

//           if (mainNextIndex === -1) {
//               result += `<span style='color:#ff6961;text-decoration:line-through'>${branch.substring(branchIndex, branch.length)}</span>`;
//               branchIndex = branch.length;
//           } else if (branchNextIndex === -1) {
//               result += `<span style='color:#77dd77'>${main.substring(mainIndex, main.length)}</span>`;
//               mainIndex = main.length;
//           } else {
//               if (mainNextIndex < branchNextIndex) {
//                   result += `<span style='color:#77dd77'>${main.substring(mainIndex, mainNextIndex)}</span>`;
//                   mainIndex = mainNextIndex;
//               } else {
//                   result += `<span style='color:#ff6961;text-decoration:line-through'>${branch.substring(branchIndex, branchNextIndex)}</span>`;
//                   branchIndex = branchNextIndex;
//               }
//           }
//       }
//   }

//   if (mainIndex < main.length) {
//       result += `<span style='color:#77dd77'>${main.substring(mainIndex, main.length)}</span>`;
//   }

//   if (branchIndex < branch.length) {
//       result += `<span style='color:#ff6961;text-decoration:line-through'>${branch.substring(branchIndex, branch.length)}</span>`;
//   }

//   return result;
// }
