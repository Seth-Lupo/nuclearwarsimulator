// let text = ["The purpose of lorem ipsum is to create a natural looking block of text."]

let content = new ReadableDiv("revealableTextDiv", text, "choiceInfoDiv")


var totalFreq = 0


$("#choiceInfo").html("ABC<br>EFG")
$("#choiceInfo").css("color", "var(--black)")
for (let button of $(".choiceButton")) {
    totalFreq += parseInt($(button).attr("freq"))
    $(button).hover(()=>{
        $("#choiceInfo").html('"'+$(button).text()+'" was chosen ' + ($(button).attr("freq")*100/totalFreq).toFixed(1) + '% of the time.<br>(' + ($(button).attr("freq")) + ' total)'  )
        $("#choiceInfo").css("color", "var(--green)")
    }, ()=>{
        $("#choiceInfo").html("ABC<br>EFG")
        $("#choiceInfo").css("color", "var(--black)")
    })
}

for (let i = 0; i < $(".choiceButton").length; i++) {
    let button = $(".choiceButton")[i]
    $(button).click(()=>{
        $.ajax({
            url: window.location.protocol + "//" + window.location.host + "/counter",
            method: "POST",
            data: {
                index: i,
                code: code,
            }
        })
        let choiceCode = $(button).attr("code")
        let path = choiceCode.charAt(0) == "E" ? "/ending/" : "/story/"
        window.location.href =  window.location.protocol + "//" + window.location.host + path + choiceCode
    })
}

if (totalFreq == 0) totalFreq = 1


// $(".choiceButton").each(()=>{
    
//     alert($(this)[0].nodeName)
    
//     $(".choiceButton").hover(()=>{
//         $("#choiceInfo").text("Hello World")
//     }, ()=>{
//         $("#choiceInfo").text("")
//     })
// })


$(".readButton").click(()=>{
    content.read()
})