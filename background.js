chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "download_excel") {
        let blob = new Blob([message.data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        let url = URL.createObjectURL(blob);

        chrome.downloads.download({
            url: url,
            filename: "exported_table.xlsx"
        });
    }
});
