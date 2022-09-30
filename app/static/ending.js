// let good = false
// let text = ["I want a barbeque bacon burger."]

// $.ajax({
//     url: window.location.protocol + "//" + window.location.host + "/counter",
//     method: "POST",
//     data: {
//         index: 0,
//         code: code,
//     }
// })

let content = new ReadableDiv("revealableTextDiv", text, "finaleDiv")

let farewell = ""

$(".readEndingButton").click(()=>{



    if (good) {
        $("body").addClass("goodEndingBody")
        $("body").css("--green", "var(--black)")
        $("body").css("--dark-green", "grey");
        farewell = "Great Job President " + getCookie("lastName") + "!<br>"
    } else {
        $("body").addClass("badEndingBody")
        $("body").css("--green", "#0723DB")
        $("body").css("--dark-green", "#041375");
        farewell = "Better Luck Next Time " + getCookie("firstName") + ". D:<br>"
        $('audio').trigger("play");
    }

    $("#farewell").html(farewell+'' + (freq*100/totalFreq).toFixed(1) + '% of people got this ending.<br>(' + (freq) + ' total)<br><br>' + (typeFreq*100/totalFreq).toFixed(1) + '% of people got a ' + (good ? 'good' : 'bad') + ' ending.');

    setTimeout(()=>{
        content.read()
    }, 1000)

})