const colorSchemes = {
    earthyTones: {
        twoColors: ["#808000", "#c2b280"],
        threeColors: ["#808000", "#c2b280", "#b66a50"],
        fourColors: ["#808000", "#c2b280", "#b66a50", "#708090"],
        fiveColors: ["#808000", "#c2b280", "#b66a50", "#708090", "#654321"],
        sixColors: ["#808000", "#c2b280", "#b66a50", "#708090", "#654321", "#8A9A5B"],
        sevenColors: ["#808000", "#c2b280", "#b66a50", "#708090", "#654321", "#8A9A5B", "#635147"]
    },
    pastelColors: {
        twoColors: ["#e6e6fa", "#ffe5b4"],
        threeColors: ["#e6e6fa", "#ffe5b4", "#f5fffa"],
        fourColors: ["#e6e6fa", "#ffe5b4", "#f5fffa", "#ffff99"],
        fiveColors: ["#e6e6fa", "#ffe5b4", "#f5fffa", "#ffff99", "#89cff0"],
        sixColors: ["#e6e6fa", "#ffe5b4", "#f5fffa", "#ffff99", "#89cff0", "#fadadd"],
        sevenColors: ["#e6e6fa", "#ffe5b4", "#f5fffa", "#ffff99", "#89cff0", "#fadadd", "#98FB98"]
    },
    vibrantColors: {
        twoColors: ["#40e0d0", "#ccff00"],
        threeColors: ["#40e0d0", "#ccff00", "#ff69b4"],
        fourColors: ["#40e0d0", "#ccff00", "#ff69b4", "#ff4500"],
        fiveColors: ["#40e0d0", "#ccff00", "#ff69b4", "#ff4500", "#fe4eda"],
        sixColors: ["#40e0d0", "#ccff00", "#ff69b4", "#ff4500", "#fe4eda", "#00FFFF"],
        sevenColors: ["#40e0d0", "#ccff00", "#ff69b4", "#ff4500", "#fe4eda", "#00FFFF", "#FF6347"]
    },
    modernChic: {
        twoColors: ["#2f4858", "#f6ae2d"],
        threeColors: ["#2f4858", "#f6ae2d", "#f26419"],
        fourColors: ["#2f4858", "#f6ae2d", "#f26419", "#33658a"],
        fiveColors: ["#2f4858", "#f6ae2d", "#f26419", "#33658a", "#86bbd8"],
        sixColors: ["#2f4858", "#f6ae2d", "#f26419", "#33658a", "#86bbd8", "#36454F"],
        sevenColors: ["#2f4858", "#f6ae2d", "#f26419", "#33658a", "#86bbd8", "#36454F", "#cd7f32"]
    },
    sereneBlues: {
        twoColors: ["#003b46", "#07575b"],
        threeColors: ["#003b46", "#07575b", "#66a5ad"],
        fourColors: ["#003b46", "#07575b", "#66a5ad", "#c4dfdd"],
        fiveColors: ["#003b46", "#07575b", "#66a5ad", "#c4dfdd", "#d9eeee"],
        sixColors: ["#003b46", "#07575b", "#66a5ad", "#c4dfdd", "#d9eeee", "#191970"],
        sevenColors: ["#003b46", "#07575b", "#66a5ad", "#c4dfdd", "#d9eeee", "#191970", "#00FFFF"]
    },
    tropicalSunset: {
        twoColors: ["#FF7F50", "#FFD700"],
        threeColors: ["#FF7F50", "#FFD700", "#8B008B"],
        fourColors: ["#FF7F50", "#FFD700", "#8B008B", "#E6BE8A"],
        fiveColors: ["#FF7F50", "#FFD700", "#8B008B", "#E6BE8A", "#FC8EAC"],
        sixColors: ["#FF7F50", "#FFD700", "#8B008B", "#E6BE8A", "#FC8EAC", "#FD5E53"],
        sevenColors: ["#FF7F50", "#FFD700", "#8B008B", "#E6BE8A", "#FC8EAC", "#FD5E53", "#9400D3"]
    },
    forestRetreat: {
        twoColors: ["#228B22", "#8B4513"],
        threeColors: ["#228B22", "#8B4513", "#8FBC8F"],
        fourColors: ["#228B22", "#8B4513", "#8FBC8F", "#FFE4E1"],
        fiveColors: ["#228B22", "#8B4513", "#8FBC8F", "#FFE4E1", "#4F7942"],
        sixColors: ["#228B22", "#8B4513", "#8FBC8F", "#FFE4E1", "#4F7942", "#E1A95F"],
        sevenColors: ["#228B22", "#8B4513", "#8FBC8F", "#FFE4E1", "#4F7942", "#E1A95F", "#013220"]
    }
};

const colorMapping = {
    2: 'twoColors',
    3: 'threeColors',
    4: 'fourColors',
    5: 'fiveColors',
    6: 'sixColors',
    7: 'sevenColors'
};

export { colorSchemes, colorMapping };