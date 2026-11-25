const affichage: Element | null = document.querySelector("header p");
const boutons: NodeListOf<Element> = document.querySelectorAll("section button");

var pile: string = "";

const evaluate = (input: string): string | null => {
	const expression = input.replaceAll("x", "*").replaceAll(",", ".");
	if (!/^[0-9.+\-*/() ]+$/.test(expression)) return null;

	try {
		return eval(expression).toString().replaceAll(".", ",");
	} catch {
		return null;
	}
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
const generateColor = () => {
	const randomColor: string = Math.floor(Math.random() * 16777215).toString(
		16
	);
	document.body.style.backgroundColor = "#" + randomColor;
	setTimeout(generateColor, 8000);
};

generateColor();
