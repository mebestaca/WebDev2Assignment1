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