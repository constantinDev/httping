/**
 * This module is made to make your day in node.js better. Its stupid easy to use, has a lot of functions and is generally nice to use for yourself.
 * @author Constantin Christoph
 * @copyright Creative Commons License
 */
module.exports = {
    Math: {
        /**
         * Generates a random integer from "from" to "to". From defaults to 0 and to defaults to 1.
         * @param {Number} from Minimum value for the number (Default:0)
         * @param {Number} to Maximum value for the number (Default:1)
         * @returns {Number} The result number
         * @example Tools.Math.randomInt(5, 10) // Something around 5 to 10
         */
        randomInt(from = 0, to = 1) {
            return Math.round(Math.random() * (to - from)) + from
        },
        /**
         * Generates a random double from "from" to "to". From defaults to 0 and to defaults to 1.
         * @param {Number} from Minimum value for the number (Default:0)
         * @param {Number} to Maximum value for the number (Default:1)
         * @returns {Number} The result number
         * @example Tools.Math.randomDouble(5, 10) // Something around 5 to 10
         */
        randomDouble(from = 0, to = 1) {

            return (Math.random() * (to - from)) + from
        },
        /**
         * Calculates an average between multiple values
         * @param {Number[]} args The numbers to calculate
         * @returns {Number} The average
         * @example Tools.Math.average([1,3]) // Returns 2
         */
        average(args) {

            return eval(args.join("+")) / args.length
        }
    },
    Input: {
        /**
         * Asks for user input
         * @param {String} text The question to prompt
         * @param {String} prefix The prefix for the user input (Default:">")
         * @returns {Promise} The user response data
         * @example Tools.Input.askForInput("How are you?","moodQuestioner>") // User will be prompted with that question
         */
        askForInput(text, prefix = ">") {

            return new Promise((res, rej) => {
                try {
                    let start = Date.now();
                    let itf = require("readline").createInterface(process.stdin, process.stdout);
                    itf.setPrompt(null)

                    itf.question(text + "\n" + prefix + " ", function (answer) {
                        res({
                            time: Date.now() - start,
                            answer: answer
                        })
                        itf.close();
                    })

                } catch (err) {
                    rej(err)
                }
            })
        }
    },
    Network: {
        makeRequest(url, https = false, method = "GET", headers = {}, timeout = 1000) {
            return new Promise((reso, rej) => {
                try {
                    let http = require(https ? "https" : "http")
                    // let http = require("http")
                    http.get(url, {
                        method: method,
                        headers: headers,
                        timeout: timeout
                    }, function (res) {
                        var data = "";
                        res.on("data", function (chunk) {
                            data += chunk
                        })
                        res.on("end", function () {
                            reso({
                                data: data,
                                response: {
                                    status: {
                                        message: res.statusMessage,
                                        code: res.statusCode
                                    },
                                    headers: res.headers
                                }
                            })
                        })
                    })
                } catch (err) {
                    rej(err)
                }
            })

        }
    },
    Data: {
        /**
         * Reverses a string
         * @param {String} input The input string
         * @returns {String} The reversed string
         * @example tools.Data.reverseString("Hello") // Returns "olleH"
         */
        reverseString(input) {
            return input.split("").reverse().join("");
        },
        Base64: {
            /**
             * Encodes something to base64
             * @param {String} input The original string
             * @returns {String} The base64 encoded string
             * @example tools.Data.Base64.encodeToBase64("This is a test") // Returns "VGhpcyBpcyBhIHRlc3Q="
             */
            encodeToBase64(input) {
                if (typeof input != "string") return new TypeError("Input should be a string, not a " + typeof input)
                return Buffer.from(input).toString("base64")
            },
            /**
             * Decodes something from base64
             * @param {String} input The base64 encoded string
             * @returns {String} The decoded ascii string
             * @example tools.Data.Base64.decodeFromBase64("VGhpcyBpcyBhIHRlc3Q=") // Returns "This is a test"
             */
            decodeFromBase64(input) {
                if (typeof input != "string") return new TypeError("Input should be a string, not a " + typeof input)
                return Buffer.from(input, "base64").toString("ascii")
            }
        },
        Binary: {
            /**
             * Converts a number to binary
             * @param {Number} input The original number
             * @returns {String} The binary output
             * @example tools.Data.Binary.convertToBinary(69) // Returns "1000101"
             */
            convertToBinary(input) {
                return input.toString(2)
            },
            /**
             * Converts binary to a number
             * @param {String} input The binary string
             * @returns {Number} The original number
             * @example tools.Data.Binary.convertFromBinary("1000101") // Returns 69
             */
            convertFromBinary(input) {
                return parseInt(input, 2);
            }
        },
        Octal: {
            /**
             * Converts a number to octal
             * @param {Number} input The original number
             * @returns {String} The octal output
             * @example tools.Data.Octal.convertToOctal(69) // Returns "105"
             */
            convertToOctal(input) {
                return input.toString(8)
            },
            /**
             * Converts octal to a number
             * @param {String} input The octal string
             * @returns {Number} The original number
             * @example tools.Data.Octal.convertFromOctal("105") // Returns 69
             */
            convertFromOctal(input) {
                return parseInt(input, 8);
            }
        },
        Hex: {
            /**
             * Converts a number to hex
             * @param {Number} input The original number
             * @returns {String} The hex output
             * @example tools.Data.Hex.convertToHex(69) // Returns "45"
             */
            convertToHex(input) {
                return input.toString(16)
            },
            /**
             * Converts hex to a number
             * @param {String} input The hex string
             * @returns {Number} The original number
             * @example tools.Data.Hex.convertFromHex("45") // Returns 69
             */
            convertFromHex(input) {
                return parseInt(input, 16);
            }
        }
    }
}
// module.exports = Tools;