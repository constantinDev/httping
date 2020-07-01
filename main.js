module.exports=function() {
    let utils = require("./util")
    // let utils = new utils1();
    let failed = false;
    try {
        var ax = require("axios").default;
        var argparse = require("argparse").ArgumentParser;
        var chalk = require("chalk")
    } catch {
        failed = true;
        console.log("[!] Dependencies missing... Installing automatically.")
        let a = require("child_process").exec(`cmd /c "npm i axios argparse chalk"`, function (err, stdout, stderr) {
            if (err || stderr.toString.length > 1) {
                return console.log("Failed to install. Please install dependencies manually by running \"npm i axios\" in this folder.")
            }

            console.log("Finished installing dependencies. Please restart the program.")
            process.exit(0);
        })
        a.stdout.on("data", console.log);
        a.stderr.on("data", console.log)

    }
    if (!failed) {
        let parse = new argparse({
            addHelp: true,
            version: require("./package.json").version,
            description: "Pings a http site to see its delay."
        })
        parse.addArgument(["-t", "--target"], {
            help: "The website to ping",
            required: true,
        })
        parse.addArgument(["-d", "--delay"], {
            required: false,
            defaultValue: 1000,
            help: "The delay to ping the website with (Number)"
        })
        parse.addArgument(["-i", "--iterations"], {
            required: false,
            defaultValue: 10,
            help: "How often the website should be pinged (Number)"
        })
        parse.addArgument(["-vb", "--verbose"], {
            required: false,
            defaultValue: false,
            help: "Extra level of logging.",
            action: "storeTrue"
        })
        let args = parse.parseArgs()
        // if (!args.target.startsWith("http://")||!args.target.startsWith("https://")) return console.log("[!] The url provided seems to be invalid. Please re-check.")
        if (!Number(args.delay)) {
            return console.log("[!] Please provide a valud integer for the delay option")
        }
        if (!Number(args.iterations)) {
            return console.log("[!] Please provide a valid integer for the iterations option")
        }
        let finI = Number(args.iterations)
        let finDel = Number(args.delay);
        let i = 0;
        let delmap = [];
        let verbose = args.verbose;
        console.log(`[i] Pinging website ${chalk.green(args.target)} ${chalk.cyan(finI)} times with a ${chalk.cyanBright(finDel)}ms delay between.`)

        function ping() {
            let d = Date.now()
            ax({
                url: args.target
            }).then(b => {

                delmap.push(Date.now() - d);
                i++;
                console.log(`[i] Finished ping ${chalk.cyan(i)} with delay ${chalk.cyanBright(Date.now()-d)}ms`)
                if (i >= finI) return console.log(`${chalk.green("[SUCCESS]")} Done pinging! Average ping time: ${chalk.cyan(Math.round(utils.Math.average(delmap)))}ms${verbose?`\nAll pings:\n   ${delmap.map(a => a+"ms").join("\n   ")}`:""}`)
                setTimeout(ping, finDel)
            }).catch(err => {
                i++;
                console.log(`${chalk.red("[!]")} Failed ping ${i}`)
                if (i >= finI) return console.log(`${chalk.green("[SUCCESS]")} Done pinging! Average ping time: ${chalk.cyan(Math.round(utils.Math.average(delmap)))}ms${verbose?`\nAll pings:\n   ${delmap.map(a => a+"ms").join("\n   ")}`:""}`)
                setTimeout(ping, finDel)
            })

        }
        ping();
    }
}