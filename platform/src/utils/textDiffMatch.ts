// import * as diff from "diff";
// import * as chalk from "chalk";

// interface TextBlock {
// 	type: string;
// 	text: string;
// 	styles: { [key: string]: any };
// }

// interface RichTextBlock {
// 	id: string;
// 	type: string;
// 	props: { [key: string]: any };
// 	content: TextBlock[];
// 	children: any[];
// }

// export function highlightDifferences(
// 	mainVersion: RichTextBlock[],
// 	branchVersion: RichTextBlock[]
// ): RichTextBlock | null {
// 	const mainText = mainVersion[0]?.content[0]?.text || "";
// 	const branchText = branchVersion[0]?.content[0]?.text || "";

// 	// Calculate differences between the two texts
// 	const differences = diff.diffLines(mainText, branchText);

// 	const highlightedText: TextBlock[] = [];
// 	differences.forEach((part) => {
// 		const added = part.added;
// 		const removed = part.removed;

// 		const color = added ? "blue" : removed ? "red" : "default";
// 		const styles = { ...(removed ? { strike: true } : {}), textColor: color };
// 		const textBlock: TextBlock = {
// 			type: "text",
// 			text: part.value,
// 			styles: styles,
// 		};

// 		highlightedText.push(textBlock);
// 	});

// 	return {
// 		...branchVersion,
// 		content: highlightedText,
// 	};
// }

// // Test data
// const mainVersionData: RichTextBlock = {
// 	id: "77388834-76ac-4d3c-9477-c6b92a71e260",
// 	type: "paragraph",
// 	props: {
// 		textColor: "default",
// 		backgroundColor: "default",
// 		textAlignment: "left",
// 	},
// 	content: [
// 		{
// 			type: "text",
// 			text: "The palace still shook occasionally as the earth rumbled in memory...",
// 			styles: {},
// 		},
// 	],
// 	children: [],
// };

// const branchVersionData: RichTextBlock = {
// 	id: "77388834-76ac-4d3c-9477-c6b92a71e260",
// 	type: "paragraph",
// 	props: {
// 		textColor: "default",
// 		backgroundColor: "default",
// 		textAlignment: "left",
// 	},
// 	content: [
// 		{
// 			type: "text",
// 			text: "The palace still shook occasionally as the earth rumbled.",
// 			styles: {},
// 		},
// 	],
// 	children: [],
// };

// const highlightedBranchVersion = highlightDifferences(
// 	mainVersionData,
// 	branchVersionData
// );
// console.log(JSON.stringify(highlightedBranchVersion, null, 2));

import * as diff from "diff";
import * as chalk from "chalk";

interface TextBlock {
	type: string;
	text: string;
	styles: { [key: string]: any };
}

interface RichTextBlock {
	id: string;
	type: string;
	props: { [key: string]: any };
	content: TextBlock[];
	children: any[];
}

export function highlightDifferences(
	mainVersion: RichTextBlock[],
	branchVersion: RichTextBlock[]
): RichTextBlock[] {
	const maxLength = Math.max(mainVersion.length, branchVersion.length);

	const highlightedTextBlocks: RichTextBlock[] = [];

	for (let index = 0; index < maxLength; index++) {
		const mainBlock = mainVersion[index];
		const branchBlock = branchVersion[index];
		const mainText = mainBlock?.content[0]?.text || "";
		const branchText = branchBlock?.content[0]?.text || "";

		// Calculate differences between the two texts
		const differences = diff.diffLines(mainText, branchText);

		const highlightedText: TextBlock[] = [];
		differences.forEach((part) => {
			const added = part.added;
			const removed = part.removed;

			const color = added ? "blue" : removed ? "red" : "default";
			const styles = { ...(removed ? { strike: true } : {}), textColor: color };
			const textBlock: TextBlock = {
				type: "text",
				text: part.value,
				styles: styles,
			};

			highlightedText.push(textBlock);
		});

		const highlightedBlock: RichTextBlock = {
			...branchBlock,
			content: highlightedText,
		};

		highlightedTextBlocks.push(highlightedBlock);
	}

	return highlightedTextBlocks;
}

// interface TextBlock {
// 	type: string;
// 	text: string;
// 	styles: { [key: string]: any };
// }

// interface RichTextBlock {
// 	id: string;
// 	type: string;
// 	props: { [key: string]: any };
// 	content: TextBlock[];
// 	children: any[];
// }

// export function highlightDifferences(
// 	main: RichTextBlock[],
// 	branch: RichTextBlock[]
// ): RichTextBlock[] {
// 	const highlightedBranch: RichTextBlock[] = [];

// 	// Iterate through the blocks in the branch array
// 	for (let i = 0; i < branch.length; i++) {
// 		const branchBlock = branch[i];
// 		const mainBlock = main[i];

// 		// Check if both branch and main blocks have the same type
// 		if (branchBlock.type === mainBlock?.type) {
// 			// Compare the content of the text blocks
// 			const highlightedContent: TextBlock[] = [];
// 			for (let j = 0; j < branchBlock.content.length; j++) {
// 				const branchTextBlock = branchBlock.content[j];
// 				const mainTextBlock = mainBlock.content[j];

// 				// Check if the main text block exists and compare text and styles of the text blocks
// 				if (
// 					mainTextBlock &&
// 					(branchTextBlock.text !== mainTextBlock.text ||
// 						JSON.stringify(branchTextBlock.styles) !==
// 							JSON.stringify(mainTextBlock.styles))
// 				) {
// 					// If differences found, add "highlighted" property to the branch text block
// 					highlightedContent.push({ ...branchTextBlock, highlighted: true });
// 				} else {
// 					highlightedContent.push(branchTextBlock);
// 				}
// 			}

// 			// Add the modified branch block to the highlightedBranch array
// 			highlightedBranch.push({ ...branchBlock, content: highlightedContent });
// 		} else {
// 			// If the block types are different, add the branch block directly
// 			highlightedBranch.push(branchBlock);
// 		}
// 	}

// 	return highlightedBranch;
// }

// import * as diff from "diff";
// import * as chalk from "chalk";

// interface TextBlock {
// 	type: string;
// 	text: string;
// 	styles: { [key: string]: any };
// }

// interface RichTextBlock {
// 	id: string;
// 	type: string;
// 	props: { [key: string]: any };
// 	content: TextBlock[];
// 	children: any[];
// }

// function findBlockById(
// 	id: string,
// 	version: RichTextBlock[]
// ): RichTextBlock | undefined {
// 	return version.find((block) => block.id === id);
// }

// export function highlightDifferences(
// 	mainVersion: RichTextBlock[],
// 	branchVersion: RichTextBlock[]
// ): RichTextBlock[] {
// 	const allBlockIds = new Set<string>([
// 		...mainVersion.map((block) => block.id),
// 		...branchVersion.map((block) => block.id),
// 	]);

// 	const highlightedTextBlocks: RichTextBlock[] = [];

// 	for (const blockId of allBlockIds) {
// 		const mainBlock = findBlockById(blockId, mainVersion);
// 		const branchBlock = findBlockById(blockId, branchVersion);

// 		const mainText = mainBlock?.content[0]?.text || "";
// 		const branchText = branchBlock?.content[0]?.text || "";

// 		// Calculate differences between the two texts
// 		const differences = diff.diffLines(mainText, branchText);

// 		const highlightedText: TextBlock[] = [];
// 		differences.forEach((part) => {
// 			const added = part.added;
// 			const removed = part.removed;

// 			let color = "default";
// 			let styles: { [key: string]: any } = {};

// 			if (added && !removed) {
// 				color = "blue"; // Text added in branch (not in main)
// 			} else if (removed && !added) {
// 				color = "red"; // Text removed from branch (was in main)
// 				styles = { strike: true };
// 			} else if (added && removed) {
// 				color = "green"; // Text changed (both added and removed)
// 			}

// 			const textBlock: TextBlock = {
// 				type: "text",
// 				text: part.value,
// 				styles: { ...styles, textColor: color },
// 			};

// 			highlightedText.push(textBlock);
// 		});

// 		const highlightedBlock: RichTextBlock = {
// 			id: blockId,
// 			type: branchBlock?.type || mainBlock?.type || "",
// 			props: branchBlock?.props || mainBlock?.props || {},
// 			content: highlightedText,
// 			children: branchBlock?.children || mainBlock?.children || [],
// 		};

// 		highlightedTextBlocks.push(highlightedBlock);
// 	}

// 	return highlightedTextBlocks;
// }

// // Test data
// const mainVersionData: RichTextBlock[] = [
// 	{
// 		id: "1",
// 		type: "paragraph",
// 		props: {
// 			textColor: "default",
// 			backgroundColor: "default",
// 			textAlignment: "left",
// 		},
// 		content: [
// 			{
// 				type: "text",
// 				text: "The palace still shook occasionally...",
// 				styles: {},
// 			},
// 		],
// 		children: [],
// 	},
// 	// Add more blocks for comparison if needed
// ];

// const branchVersionData: RichTextBlock[] = [
// 	{
// 		id: "1",
// 		type: "paragraph",
// 		props: {
// 			textColor: "default",
// 			backgroundColor: "default",
// 			textAlignment: "left",
// 		},
// 		content: [
// 			{
// 				type: "text",
// 				text: "The palace still shook occasionally as the earth rumbled.",
// 				styles: {},
// 			},
// 		],
// 		children: [],
// 	},
// 	{
// 		id: "2",
// 		type: "paragraph",
// 		props: {
// 			textColor: "default",
// 			backgroundColor: "default",
// 			textAlignment: "left",
// 		},
// 		content: [
// 			{
// 				type: "text",
// 				text: "Branch version has an extra paragraph block.",
// 				styles: {},
// 			},
// 		],
// 		children: [],
// 	},
// 	// Add more blocks for comparison if needed
// ];

// const highlightedDifferences = highlightDifferences(
// 	mainVersionData,
// 	branchVersionData
// );
// console.log(JSON.stringify(highlightedDifferences, null, 2));

// import * as diff from "diff";
// TODO:
// import * as diff from "diff";

// interface TextBlock {
// 	type: string;
// 	text: string;
// 	styles: { [key: string]: any };
// }

// interface RichTextBlock {
// 	id: string;
// 	type: string;
// 	props: { [key: string]: any };
// 	content: TextBlock[];
// 	children: any[];
// }

// function findBlockById(
// 	id: string,
// 	version: RichTextBlock[]
// ): RichTextBlock | undefined {
// 	return version.find((block) => block.id === id);
// }

// export function highlightDifferences(
// 	mainVersion: RichTextBlock[],
// 	branchVersion: RichTextBlock[]
// ): RichTextBlock[] {
// 	const allBlockIds = new Set<string>([
// 		...mainVersion.map((block) => block.id),
// 		...branchVersion.map((block) => block.id),
// 	]);

// 	const blockPositions: Map<string, number> = new Map();
// 	const highlightedTextBlocks: RichTextBlock[] = [];

// 	for (const blockId of allBlockIds) {
// 		const mainBlock = findBlockById(blockId, mainVersion);
// 		const branchBlock = findBlockById(blockId, branchVersion);

// 		const mainText = mainBlock?.content[0]?.text || "";
// 		const branchText = branchBlock?.content[0]?.text || "";

// 		// Calculate differences between the two texts
// 		const differences = diff.diffChars(mainText, branchText);

// 		const highlightedText: TextBlock[] = [];
// 		let positionAdjustment = 0;

// 		differences.forEach((part) => {
// 			const added = part.added;
// 			const removed = part.removed;

// 			const color = added ? "blue" : removed ? "red" : "default";
// 			const styles = { ...(removed ? { strike: true } : {}), textColor: color };
// 			const textBlock: TextBlock = {
// 				type: "text",
// 				text: part.value,
// 				styles: styles,
// 			};

// 			highlightedText.push(textBlock);

// 			if (added) {
// 				blockPositions.set(blockId, (blockPositions.get(blockId) || 0) + 1);
// 				positionAdjustment++;
// 			} else if (removed) {
// 				blockPositions.set(blockId, (blockPositions.get(blockId) || 0) - 1);
// 				positionAdjustment--;
// 			}
// 		});

// 		const highlightedBlock: RichTextBlock = {
// 			id: blockId,
// 			type: branchBlock?.type || mainBlock?.type || "",
// 			props: branchBlock?.props || mainBlock?.props || {},
// 			content: highlightedText,
// 			children: branchBlock?.children || mainBlock?.children || [],
// 		};

// 		highlightedTextBlocks.push(highlightedBlock);

// 		// Adjust positions for remaining blocks
// 		const remainingPosition = blockPositions.get(blockId) || 0;
// 		for (let i = 1; i < remainingPosition; i++) {
// 			highlightedTextBlocks.push(highlightedBlock);
// 		}
// 	}

// 	return highlightedTextBlocks;
// }

// export default highlightDifferences;

// import * as diff from "diff";

// interface TextBlock {
// 	type: string;
// 	text: string;
// 	styles: { [key: string]: any };
// }

// interface RichTextBlock {
// 	id: string;
// 	type: string;
// 	props: { [key: string]: any };
// 	content: TextBlock[];
// 	children: any[];
// }

// function findBlockById(id: string, version: RichTextBlock[]): RichTextBlock | undefined {
//   return version.find((block) => block.id === id);
// }

// export function highlightDifferences(
//   mainVersion: RichTextBlock[],
//   branchVersion: RichTextBlock[]
// ): RichTextBlock[] {
//   const allBlockIds = new Set<string>([
//     ...mainVersion.map((block) => block.id),
//     ...branchVersion.map((block) => block.id),
//   ]);

//   const blockPositions: Map<string, number> = new Map();

//   const highlightedTextBlocks: RichTextBlock[] = [];

//   for (const blockId of allBlockIds) {
//     const mainBlock = findBlockById(blockId, mainVersion);
//     const branchBlock = findBlockById(blockId, branchVersion);

//     const mainText = mainBlock?.content[0]?.text || "";
//     const branchText = branchBlock?.content[0]?.text || "";

//     // Calculate differences between the two texts
//     const differences = diff.diffLines(mainText, branchText);

//     const highlightedText: TextBlock[] = [];
//     let positionAdjustment = 0;

//     let insertPosition = highlightedTextBlocks.length; // Start from the end of the array

//     differences.forEach((part) => {
//       const added = part.added;
//       const removed = part.removed;

//       const color = added ? "blue" : removed ? "red" : "default";
//       const styles = { ...(removed ? { strike: true } : {}), textColor: color };
//       const textBlock: TextBlock = {
//         type: "text",
//         text: part.value,
//         styles: styles,
//       };

//       if (added) {
//         blockPositions.set(blockId, (blockPositions.get(blockId) || 0) + 1);
//         positionAdjustment++;
//         insertPosition = highlightedText.length; // Set the insert position within this block
//       } else if (removed) {
//         blockPositions.set(blockId, (blockPositions.get(blockId) || 0) - 1);
//         positionAdjustment--;
//       }

//       highlightedText.push(textBlock);
//     });

//     const highlightedBlock: RichTextBlock = {
//       id: blockId,
//       type: branchBlock?.type || mainBlock?.type || "",
//       props: branchBlock?.props || mainBlock?.props || {},
//       content: highlightedText,
//       children: branchBlock?.children || mainBlock?.children || [],
//     };

//     highlightedTextBlocks.splice(insertPosition, 0, highlightedBlock);

//     // Adjust positions for remaining blocks
//     const remainingPosition = blockPositions.get(blockId) || 0;
//     for (let i = 1; i < remainingPosition; i++) {
//       highlightedTextBlocks.splice(insertPosition + i, 0, highlightedBlock);
//     }
//   }

//   return highlightedTextBlocks;
// }

// export default highlightDifferences;
// export function highlightDifferences(
// 	main: RichTextBlock[],
// 	branch: RichTextBlock[]
// ): RichTextBlock[] {
// 	const highlightedBranch: RichTextBlock[] = [];

// 	// Iterate through the blocks in the branch array
// 	for (let i = 0; i < branch.length; i++) {
// 		const branchBlock = branch[i];
// 		const mainBlock = main[i];

// 		// Check if both branch and main blocks have the same type
// 		if (branchBlock.type === mainBlock?.type) {
// 			// Compare the content of the text blocks
// 			const highlightedContent: TextBlock[] = [];
// 			const branchTextBlocks = branchBlock.content;
// 			const mainTextBlocks = mainBlock.content;

// 			const maxLength = Math.max(
// 				branchTextBlocks.length,
// 				mainTextBlocks.length
// 			);
// 			for (let j = 0; j < maxLength; j++) {
// 				const branchTextBlock = branchTextBlocks[j];
// 				const mainTextBlock = mainTextBlocks[j];

// 				if (branchTextBlock && mainTextBlock) {
// 					// Compare the text of the text blocks
// 					if (branchTextBlock.text === mainTextBlock.text) {
// 						// Unchanged text, add to highlightedContent as is
// 						highlightedContent.push(branchTextBlock);
// 					} else {
// 						// Changed text, add to highlightedContent with the appropriate style
// 						const style = {
// 							...branchTextBlock.styles,
// 							textColor:
// 								branchTextBlock.text.length > mainTextBlock.text.length
// 									? "blue"
// 									: "red",
// 						};
// 						highlightedContent.push({ ...branchTextBlock, styles: style });
// 					}
// 				} else if (branchTextBlock) {
// 					// New text, add to highlightedContent with green style
// 					const style = { ...branchTextBlock.styles, textColor: "blue" };
// 					highlightedContent.push({ ...branchTextBlock, styles: style });
// 				} else if (mainTextBlock) {
// 					// Removed text, add to highlightedContent with red style
// 					const style = { ...mainTextBlock.styles, textColor: "red" };
// 					highlightedContent.push({ ...mainTextBlock, styles: style });
// 				}
// 			}

// 			// Add the modified branch block to the highlightedBranch array
// 			highlightedBranch.push({ ...branchBlock, content: highlightedContent });
// 		} else {
// 			// If the block types are different, add the branch block directly
// 			highlightedBranch.push(branchBlock);
// 		}
// 	}

// 	return highlightedBranch;
// }
