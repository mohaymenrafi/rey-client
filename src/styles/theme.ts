// I need to fix this later "any"  type. Only product colors will be any type, others will be strcitly types.
//TODO: update the product colors in the mongodb file. change from static name to hex codes there.

const theme: any = {
	col: {
		skyblue: "#EBF6FC",
		darkBlue: "#1E306E",
		blueHover: "#000038",
		lightGray: "#EEEEEE",
		gray: "#485056",
		"gray-2": "#6D757E",
		"gray-3": "#484f56",
		white: "#ffffff",
		"white-2": "#F3F9FC",
		black: "#000000",
		"black-2": "#111E49",
		red: "#eb0014",
	},

	fs: {
		xxs: "10px",
		xs: "12px",
		sm: "14px",
		base: "16px",
		md: "18px",
		"md-2": "20px",
		"md-3": "24px",
		lg: "26px",
		"lg-2": "29px",
		xl: "34px",
		"xl-2": "35px",
		xxxl: "60px",
	},
	sc: {
		xs: "470px",
		sm: "640px",
		md: "768px",
		lg: "1024px",
		xl: "1280px",
		"2xl": "1536px",
	},
	spacing: {
		"5": "5px",
		"15": "15px",
		"30": "30px",
	},
};

export { theme };

// productColor: {
// 	gray: "#485056",
// 	white: "#ffffff",
// 	black: "#000000",
// 	mustard: "#FFDB58",
// 	golden: "##FFD700",
// 	yellow: "#FFFF00",
// 	brown: "#964B00",
// 	cream: "#FFFDD0",
// 	blue: "#1c4966",
// 	red: "#FF0000",
// 	chocolate: "#7B3F00",
// 	green: "#00FF00",
// 	wood: "#deb886",
// 	skyblue: "#87CEEB",
// },
