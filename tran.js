const countries = {
    "en": "English",
    "hi": "Hindi",
    "mr": "Marathi",
    "fr": "French",
    "es": "Spanish",
    "de": "German",
    "ja": "Japanese",
    "zh": "Chinese",
    "ar": "Arabic"
};

const selectTag = document.querySelectorAll("select");
const fromText = document.querySelector("#fromtext");
const toText = document.querySelector("#totext");

selectTag.forEach((tag, index) => {
    for (const countryCode in countries) {
        let selected = "";
        if (index === 0 && countryCode === "en") selected = "selected";
        if (index === 1 && countryCode === "mr") selected = "selected";

        let option = `<option value="${countryCode}" ${selected}>${countries[countryCode]}</option>`;
        tag.innerHTML += option;
    }
});

// Translate Button
const translateBtn = document.querySelector("#transfor");

translateBtn.addEventListener("click", () => {
    const text = fromText.value.trim();
    const translateFrom = selectTag[0].value;
    const translateTo = selectTag[1].value;

    if (!text) {
        alert("Please enter text to translate.");
        return;
    }

    const apiURL = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;

    fetch(apiURL)
        .then(res => res.json())
        .then(data => {
            toText.value = data.responseData.translatedText;
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Something went wrong during translation.");
        });
});

// Copy Buttons
const fromCopy = document.querySelector("#fromCopy");
const toCopy = document.querySelector("#toCopy");

fromCopy.addEventListener("click", () => {
    navigator.clipboard.writeText(fromText.value)
        .then(() => alert("Copied source text..."));
});

toCopy.addEventListener("click", () => {
    navigator.clipboard.writeText(toText.value)
        .then(() => alert("Copied translated text..."));
});

// Speaker Buttons
const fromSpeaker = document.querySelector("#fromSpeaker");
const toSpeaker = document.querySelector("#toSpeaker");

fromSpeaker.addEventListener("click", () => {
    let utterance = new SpeechSynthesisUtterance(fromText.value);
    utterance.lang = selectTag[0].value;
    speechSynthesis.speak(utterance);
});

toSpeaker.addEventListener("click", () => {
    let utterance = new SpeechSynthesisUtterance(toText.value);
    utterance.lang = selectTag[0].value;
    speechSynthesis.speak(utterance);
});
