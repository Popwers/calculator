const affichage = document.querySelector<HTMLParagraphElement>("header p");
const boutons = document.querySelectorAll<HTMLElement>("section span");

let pile = "";
const operators = new Set(["+", "-", "x", "/"]);

const isOperator = (char: string | undefined): boolean =>
	typeof char === "string" && operators.has(char);

const getLastChar = (): string | undefined => pile[pile.length - 1];

const getCurrentNumber = (): string => {
	let index = pile.length - 1;

	while (index >= 0) {
		const char = pile[index];
		if (isOperator(char) || char === "(" || char === ")") {
			break;
		}
		index -= 1;
	}

	return pile.slice(index + 1);
};

const trimTrailingTokens = (): void => {
	while (pile.length > 0) {
		const lastChar = getLastChar();

		if (!lastChar || isOperator(lastChar) || lastChar === ",") {
			pile = pile.slice(0, -1);
			continue;
		}

		break;
	}
};

const updateDisplay = (): void => {
	if (affichage) affichage.textContent = pile;
};

const resetIfError = (key: string): void => {
	if (pile === "Erreur" && key !== "AC") {
		pile = "";
	}
};

const appendDigit = (digit: string): void => {
	const currentNumber = getCurrentNumber();

	if (currentNumber === "0") {
		pile = `${pile.slice(0, -1)}${digit}`;
		return;
	}

	pile += digit;
};

boutons.forEach((bouton) =>
	bouton.addEventListener("click", (event: Event) => {
		const key = (event.currentTarget as HTMLElement).textContent?.trim();
		if (!key) return;

		resetIfError(key);

		switch (key) {
			case "AC":
				pile = "";
				break;

			case "DEL":
				pile = pile.slice(0, -1);
				break;

			case ",": {
				const lastChar = getLastChar();

				if (lastChar === ")") break;

				if (!lastChar || isOperator(lastChar) || lastChar === "(") {
					pile += "0,";
					break;
				}

				const currentNumber = getCurrentNumber();
				if (!currentNumber.includes(",")) {
					pile += ",";
				}
				break;
			}

			case "=":
				if (!pile) break;
				trimTrailingTokens();
				if (!pile) break;

				try {
					const expression = pile.replaceAll("x", "*").replaceAll(",", ".");
					const result = Number(eval(expression));
					pile = Number.isFinite(result)
						? result.toString().replaceAll(".", ",")
						: "Erreur";
				} catch {
					pile = "Erreur";
				}
				break;

			case "+":
			case "-":
			case "x":
			case "/": {
				const lastChar = getLastChar();

				if (!pile) {
					if (key === "-") pile = "-";
					break;
				}

				if (lastChar === "(" && key !== "-") break;

				if (isOperator(lastChar)) {
					if (key === "-" && (lastChar === "x" || lastChar === "/")) {
						pile += key;
					} else {
						pile = `${pile.slice(0, -1)}${key}`;
					}
				} else if (lastChar !== ",") {
					pile += key;
				}
				break;
			}

			case "(": {
				const lastChar = getLastChar();

				if (!lastChar || isOperator(lastChar) || lastChar === "(") {
					pile += "(";
				}
				break;
			}

			case ")": {
				const lastChar = getLastChar();
				const opened = (pile.match(/\(/g) ?? []).length;
				const closed = (pile.match(/\)/g) ?? []).length;

				if (
					opened > closed &&
					lastChar &&
					!isOperator(lastChar) &&
					lastChar !== "," &&
					lastChar !== "("
				) {
					pile += ")";
				}
				break;
			}

			default:
				if (/^\d$/.test(key)) {
					appendDigit(key);
				}
				break;
		}

		updateDisplay();
	})
);

const generateColor = () => {
	const randomColor = Math.floor(Math.random() * 0xffffff)
		.toString(16)
		.padStart(6, "0");

	document.body.style.backgroundColor = `#${randomColor}`;
	setTimeout(generateColor, 8000);
};

generateColor();
