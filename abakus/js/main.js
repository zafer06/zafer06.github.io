const appVersion = "0.8.3"
document.title = "Abaküs - Finansal Hesap Makinası | v" + appVersion;

function depositModule() {
    return {
        formData: {
            amount: "0",
            rate: "0",
            expiry: 0,
            tax: 15
        },
        resultData: {
            amount: "0,00",
            grossAmount: "0,00",
            netAmount: "0,00",
            grandTotal: "0,00",
            tax: "0,00",
            beginDate: "---",
            endDate: "---",
            diffDays: 0
        },

        calculate() {
            let amount = Number(this.formData.amount.replace(",", "."));
            let rate = Number(this.formData.rate.replace(",", "."));

            let grossAmount = (amount / 100) * (rate / 365) * this.formData.expiry;
            let tax = (grossAmount * this.formData.tax) / 100;
            let netAmount = grossAmount - tax;
            let today = new Date();
            let endDate = addDays(Number(this.formData.expiry));

            this.resultData.amount = formatNumber(amount);
            this.resultData.grossAmount = formatNumber(grossAmount);
            this.resultData.tax = formatNumber(tax);
            this.resultData.netAmount = formatNumber(netAmount);
            this.resultData.grandTotal = formatNumber(amount + netAmount);
            this.resultData.beginDate = formatDate(today);
            this.resultData.endDate = formatDate(endDate);
            this.resultData.diffDays = diffDays(today, endDate)

            console.log("diff days: ", diffDays(today, endDate));

            // sendEmail();
        }
    }
}

function diffDays(begin, end) {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    return Math.round(Math.abs((begin - end) / oneDay));
}

function addDays(days) {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

    let today = new Date();
    return new Date(today.getTime() + days * oneDay);
}

function formatDate(date) {
    let formatter = new Intl.DateTimeFormat('tr-TR', {
        dateStyle: 'full',
        timeStyle: 'short'
    });

    return formatter.format(date)
}

function formatNumber(number) {
    // Create our number formatter.
    let formatter = new Intl.NumberFormat('tr-TR', {
        style: 'decimal',
        currency: 'TRY',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });

    return formatter.format(number);
}

function sendMessage() {
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;

    Email.send({
        //SecureToken: "6062a736-9f61-44d5-9a2f-a18bbb8b1201",
        SecureToken: "eea73541-8e5b-478d-bffb-6184d8cadbd2",
        To: 'zafercelenk@gmail.com',
        From: "zafercelenk@gmail.com",
        Subject: "Abakus uygulamasindan mesaj var",
        Body: message +"<br><br>"+ email
    }).then(
        message => {
            if (message == "OK") {
                alert("Mesajınız iletilmiştir. Teşekkür ederiz.")
            } else {
                alert("Hatalar oluştu. Lütfen daha sonra tekrar deneyin");
                console.log(message);
            }
        }
    );
}
