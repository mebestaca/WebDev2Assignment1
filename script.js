/*****************************************************************************************************************************
 * Name: Dyck, Joshua
 *       Estaca, Marc Edison
 *       Realica, Reiner Justin
 * Date: May 30, 2026
 * 
 * Program Description:
 * This program displays a responsive Two-Way Metric Imperial Unit Converter forms. Users can convert between pounds and 
 * kilograms, miles and kilometres, and Celsius and Fahrenheit. The program accepts either a single numeric value or a 
 * comma-separated list of numeric values entered through the website forms. A higher-order function creates the appropriate
 * conversion function based on the selected units, processes the input values, and returns the converted result. The output
 * is displayed on the webpage for the user in either a single-value format or an array format.
 * 
 * Inputs:
 * - Single numeric value entered by the user
 * - Comma-separated list of numeric values
 * - Selected conversion type
 * 
 * Processing:
 * - Parse user input
 * - Create conversion function using a higher-order function
 * - Perform the requested unit conversion
 * - Format and display results
 * 
 * Outputs:
 * Converted value or array of converted values displayed on the webpage
 * 
*******************************************************************************************************************************/

// creates and returns a conversion function based on the source and target measurement units.
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

//creates reusable converter functions for all supported measurement types.
const lbToKg = createConverter("lb", "kg");
const kgToLb = createConverter("kg", "lb");

const mileToKm = createConverter("mile", "km");
const kmToMile = createConverter("km", "mile");

const cToF = createConverter("c", "f");
const fToC = createConverter("f", "c");

//stores all conversion functions so they can be accessed effectively based on user selections.
const converters = {
    "lb-kg": lbToKg,
    "kg-lb": kgToLb,
    "mile-km": mileToKm,
    "km-mile": kmToMile,
    "c-f": cToF,
    "f-c": fToC
};

//determines whether the user entered a single value or a comma-separated list and converts the
//input into the appropriate data type.
function parseInput(value) {

    if (value.includes(",")) {
        return value
        .split(",")
        .map(v => Number(v.trim()));
    }

    return Number(value);
}

//retrieves user input, performs the requested conversion, and displays the results on the page.
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

//controls which conversion section is displayed when a user clicks a tab in the navigation bar.
const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach(button => {

    button.addEventListener("click", () => {

        tabButtons.forEach(btn => {
            btn.classList.remove("bg-[#FFF0C7]");
        });

        button.classList.add("bg-[#FFF0C7]");

        const selectedTab = button.dataset.tab;

        tabContents.forEach(content => {

            if (content.id === selectedTab) {
                content.classList.remove("hidden");
            } else {
                content.classList.add("hidden");
            }
        });
    });
});