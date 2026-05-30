function createConverter(fromUnit, toUnit) {

    return (input) => {

        const convertValue = (value) => {

            switch (`${fromUnit}-${toUnit}`) {

                case "lb-kg":
                    return +(value * 0.453592).toFixed(2);

                case "kg-lb":
                    return +(value * 1.60934).toFixed(2);

                case "mile-km":
                    return +(value * 1.60934).toFixed(2);

                case "km-mile":
                    return +(value / 1.60934).toFixed(2);
                
                case "c-f":
                    return +((value * 9/5) + 32).toFixed(2);

                case "f-c":
                    return +((value - 32) * 5/9).toFixed(2);

                default:
                    return value;
            }
        };

        if (Array.isArray(input)) {
            return input.map(convertValue);
        }

        return convertValue(input);
    };
}

const lbToKg = createConverter("lb", "kg");
const kgToLb = createConverter("kg", "lb");

const mileToKm = createConverter("mile", "km");
const kmToMile = createConverter("km", "mile");

const cToF = createConverter("c", "f");
const fToC = createConverter("f", "c");

const converters = {
    "lb-kg": lbToKg,
    "kg-lb": kgToLb,
    "mile-km": mileToKm,
    "km-mile": kmToMile,
    "c-f": cToF,
    "f-c": fToC
};

function parseInput(value) {

    if (value.includes(",")) {
        return value
        .split(",")
        .map(v => Number(v.trim()));
    }

    return Number(value);
}

function handleConversion(from, to, inputId, resultId) {

    const rawInput = document.getElementById(inputId).value;

    const parsedInput = parseInput(rawInput);

    const converter = converters[`${from}-${to}`];

    const result = converter(parsedInput);

    document.getElementById(resultId).innerText = 
        Array.isArray(result)
        ? `Result: [${result.join(", ")}]`
        : `Result: ${result}`;
}