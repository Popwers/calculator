const affichage: Element | null = document.querySelector("header output");
const boutons: NodeListOf<Element> = document.querySelectorAll("section button");

var pile: string = "";

type Token = number | "+" | "-" | "*" | "/" | "(" | ")";

const tokenize = (expression: string): Token[] | null => {
	const tokens: Token[] = [];
	const pattern = /\s*(?:(\d+\.?\d*|\.\d+)|([-+*/()]))/y;

	while (pattern.lastIndex < expression.length) {
		const match = pattern.exec(expression);
		if (match === null) return expression.slice(pattern.lastIndex).trim() === "" ? tokens : null;
		tokens.push(match[1] !== undefined ? Number(match[1]) : (match[2] as Token));
	}

	return tokens;
};

const parseExpression = (tokens: Token[]): number | null => {
	let index = 0;

	const parseValue = (): number | null => {
		const token = tokens[index++];
		if (typeof token === "number") return token;
		if (token === "-" || token === "+") {
			const value = parseValue();
			return value === null ? null : token === "-" ? -value : value;
		}
		if (token === "(") {
			const value = parseSum();
			if (value === null || tokens[index++] !== ")") return null;
			return value;
		}
		return null;
	};

	const parseProduct = (): number | null => {
		let left = parseValue();
		while (left !== null && (tokens[index] === "*" || tokens[index] === "/")) {
			const operator = tokens[index++];
			const right = parseValue();
			if (right === null) return null;
			left = operator === "*" ? left * right : left / right;
		}
		return left;
	};

	const parseSum = (): number | null => {
		let left = parseProduct();
		while (left !== null && (tokens[index] === "+" || tokens[index] === "-")) {
			const operator = tokens[index++];
			const right = parseProduct();
			if (right === null) return null;
			left = operator === "+" ? left + right : left - right;
		}
		return left;
	};

	const result = parseSum();
	return index === tokens.length ? result : null;
};

const evaluate = (input: string): string | null => {
	const tokens = tokenize(input.replaceAll("x", "*").replaceAll(",", "."));
	if (tokens === null || tokens.length === 0) return null;

	const result = parseExpression(tokens);
	if (result === null || !Number.isFinite(result)) return null;

	return result.toString().replaceAll(".", ",");
};

boutons.forEach((bouton: Element) =>
	bouton.addEventListener("click", (e: Event) => {
		switch (e.target?.innerHTML) {
			case "0":
				if (!(pile.length === 1 && pile[0] === "0"))
					pile += e.target?.innerHTML;
				break;

			case ",":
				if (
					pile[pile.length - 1] === undefined ||
					pile[pile.length - 1] === "+" ||
					pile[pile.length - 1] === "-" ||
					pile[pile.length - 1] === "x" ||
					pile[pile.length - 1] === "/"
				) {
					pile += "0,";
				} else {
					pile += e.target?.innerHTML;
				}

				break;

			case "AC":
				pile = "";
				break;

			case "DEL":
				pile = pile.substring(0, pile.length - 1);
				break;

			case "=": {
				const result = evaluate(pile);
				if (result !== null) pile = result;
				break;
			}

			case "+":
			case "-":
			case "x":
			case "/":
				switch (pile[pile.length - 1]) {
					case "+":
					case "-":
					case "x":
					case "/":
						pile = pile.substring(0, pile.length - 1);
						break;
				}

			default:
				if (pile[0] === "0" && pile.length > 1 && pile[1] !== ",")
					pile = pile.substring(1, pile.length);
				pile += e.target?.innerHTML;
				break;
		}

		if (affichage != null) affichage.innerHTML = pile;
	})
);

/* Background Loop Color */
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

let colorTimer: number | undefined;

const generateColor = () => {
	clearTimeout(colorTimer);
	if (reducedMotion.matches) return;

	const randomColor: string = Math.floor(Math.random() * 16777215).toString(
		16
	);
	document.body.style.backgroundColor = "#" + randomColor;
	colorTimer = setTimeout(generateColor, 8000);
};

generateColor();
reducedMotion.addEventListener("change", generateColor);
