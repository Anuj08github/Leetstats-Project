document.addEventListener("DOMContentLoaded",()=>{
    const searchbutton = document.querySelector('#searchbt');
    const userInput = document.querySelector('#userName');
    const userstatics = document.querySelector('#userstat');
    const userquestions = document.querySelector('#userq');
    const easycompletion = document.querySelector('.easycompletion');
    const mediumcompletion = document.querySelector('.mediumcompletion');
    const hardcompletion = document.querySelector('.hardcompletion');
    const easylabel = document.querySelector('#easylabel');
    const mediumlabel = document.querySelector('#mediumlabel');
    const hardlabel = document.querySelector('#hardlabel');
    const statsCards = document.querySelector('#statsCards');

    function validateUsername(username){
        if(username.trim()===""){
            alert("Username must not be empty");
            return false;
        }
        const regex = /^[a-zA-Z0-9](?:[a-zA-Z0-9_-]{0,13}[a-zA-Z0-9])?$/;
        const isMatching = regex.test(username);
        if(!isMatching) {
            alert("Invalid Username");
        }
        return isMatching;
    }

    async function fetchUserDetails(username){
        try{
            searchbutton.textContent = "Searching...";
            searchbutton.disabled = true;

            // const response = await fetch(url);
            const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
            const targetUrl = 'https://leetcode.com/graphql/';
            
            const myHeaders = new Headers();
            myHeaders.append("content-type", "application/json");

            const graphql = JSON.stringify({
                query: "\n    query userSessionProgress($username: String!) {\n  allQuestionsCount {\n    difficulty\n    count\n  }\n  matchedUser(username: $username) {\n    submitStats {\n      acSubmissionNum {\n        difficulty\n        count\n        submissions\n      }\n      totalSubmissionNum {\n        difficulty\n        count\n        submissions\n      }\n    }\n  }\n}\n    ",
                variables: { "username": `${username}` }
            })
            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: graphql,
            };

            const response = await fetch(proxyUrl+targetUrl, requestOptions);
            if(!response.ok) {
                throw new Error("Unable to fetch the User details");
            }
            const parsedData = await response.json();
            console.log("Logging data: ", parsedData);

            displayUserData(parsedData);
        }
        catch(error) {
            userstatics.innerHTML = `<p>${error.message}</p>`;
        }
        finally{
            searchbutton.textContent = "Search";
            searchbutton.disabled = false;
        }
    }

    function updateProgress(solved,total,label,circle){
        const progressDegree = (solved/total)*100;
        circle.style.setProperty("--progressDegree",`${progressDegree}%`);
        label.textContent = `${solved}/${total}`;
    }

    function displayUserData(parsedData){
        const totalQues = parsedData.data.allQuestionsCount[0].count;
        const totalEasyQues = parsedData.data.allQuestionsCount[1].count;
        const totalMediumQues = parsedData.data.allQuestionsCount[2].count;
        const totalHardQues = parsedData.data.allQuestionsCount[3].count;

        const totalAttemptedQues = parsedData.data.matchedUser.submitStats.acSubmissionNum[0].count;
        const totalEasyAttemptedQues = parsedData.data.matchedUser.submitStats.acSubmissionNum[1].count;
        const totalMediumAttemptedQues = parsedData.data.matchedUser.submitStats.acSubmissionNum[2].count;
        const totalHardAttemptedQues = parsedData.data.matchedUser.submitStats.acSubmissionNum[3].count;

        updateProgress(totalEasyAttemptedQues,totalEasyQues,easylabel,easycompletion);
        updateProgress(totalMediumAttemptedQues,totalMediumQues,mediumlabel,mediumcompletion);
        updateProgress(totalHardAttemptedQues,totalHardQues,hardlabel,hardcompletion);

        const cardsData = [
            {label: "Overall Submissions: ", value:parsedData.data.matchedUser.submitStats.totalSubmissionNum[0].submissions },
            {label: "Overall Easy Submissions: ", value:parsedData.data.matchedUser.submitStats.totalSubmissionNum[1].submissions },
            {label: "Overall Medium Submissions: ", value:parsedData.data.matchedUser.submitStats.totalSubmissionNum[2].submissions },
            {label: "Overall Hard Submissions: ", value:parsedData.data.matchedUser.submitStats.totalSubmissionNum[3].submissions },
        ];

        statsCards.innerHTML = cardsData.map(
            data => 
                    `<div class="card">
                    <h4>${data.label}</h4>
                    <p id='valued'>${data.value}</p>
                    </div>`
        ).join("")
    }

    searchbutton.addEventListener('click',(event)=>{
        event.preventDefault();
        const username = userInput.value;
        console.log("Your Username is:",username);
        if(validateUsername(username)){
            fetchUserDetails(username);
        }
    });
});