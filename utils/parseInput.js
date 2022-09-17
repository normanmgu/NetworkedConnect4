function parseInput(input) {
    let inputArr = input.trim().split(/\s+/);
    let transceiver = inputArr[0];
    let username = inputArr[1];
    let id = inputArr[2]; 
    return { transceiver, username, id };
}

module.exports = parseInput;
