let text = ["The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content.", "The passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software. Today it's seen all around the web; on templates, websites, and stock designs. Use our generator to get your own, or read on for the authoritative history of lorem ipsum."]

class ReadableDiv {

    constructor(id, text, finalId) {
        this.revealed = false
        this.text = text
        this.id = id
        this.finalId = finalId
    }
    
    read() {
        if (this.revealed) return
        this.revealed = true
        this.readSection(0)
    }

    readSection(textIndex) {

        let currentPara = $("<p class='revealableText'></p>")
        $("#"+this.id).append(currentPara)

        let addChar = (charIndex)=>{
            setTimeout(()=>{
                currentPara.append(this.text[textIndex].charAt(charIndex))
                if (charIndex < this.text[textIndex].length-1) addChar(charIndex+1)
            }, 1)
        }
        addChar(0)

        // let settings = {
        //     e: 0.001, 
        //     t: 45,
        // }
        // currentPara.typetype(this.text[textIndex], settings)

        let sam = new SamJs({
            speed: 60,
            pitch: 92,
            throat: 110,
            mouth: 105,
        });
        sam.speak(this.text[textIndex])
        .then(()=>{
        currentPara.addClass("revealedText")
        setTimeout(()=>{
            if (textIndex == this.text.length-1) {
                if (this.finalId!=null) $("#"+this.finalId).fadeIn(3000)
            } else this.readSection(textIndex+1)
        }, 1000)
        })

    }

}

let content = new ReadableDiv("revealableTextDiv", text, "startForm")

$(".readButton").click(()=>{
    content.read()
})

$("#startFormButton").click(()=>{
    let firstName  = $("#firstNameInput").val()
    let lastName  = $("#lastNameInput").val()
    let gender = $('input[name=gender]:checked').val()
    if (firstName == "" || lastName == "" || gender == undefined) {
        $("#warningHeader").fadeIn(300)
    }
    else {
        console.log(firstName, lastName, gender)
    }
})
    
    