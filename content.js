const heads = {
    method: "GET",
    headers: {
        "X-API-Key": key
    }
};

console.log("Politips running...");
var members = getMembers(heads);
// console.log('Members: ', members);
setTimeout(function () {
    //Replace each member with a new html element
    for (let member of members) {
        var regex = new RegExp(member.first_name + ' ' + member.last_name, "g");
        tipHTML = '<style>' +
            '/* Tooltip container */' +
            '.tooltip {' +
            '  position: relative;' +
            '  display: inline-block;' +
            '  border-bottom: 1px dotted black;' +
            '}' +
            '' +
            '/* Tooltip text */' +
            '.tooltip .tooltiptext {' +
            '  visibility: hidden;' +
            '  width: 200%;' +
            '  font-size: 80%;' +
            '  background-color: black;' +
            '  color: #fff;' +
            '  text-align: center;' +
            '  padding: 5px 0;' +
            '  border-radius: 6px;' +
            ' ' +
            '  /* Position the tooltip text - see examples below! */' +
            '  position: absolute;' +
            '  z-index: 1;' +
            '}' +
            '' +
            '/* Show the tooltip text when you mouse over the tooltip container */' +
            '.tooltip:hover .tooltiptext {' +
            '  visibility: visible;' +
            '}' +
            '</style>' +
            '' +
            '<div class="tooltip">' + member.first_name + ' ' + member.last_name +
            '  <span class="tooltiptext"><b>' + member.first_name + ' ' + member.last_name + '</b> </nbsp>(' + member.party + ', ' + member.state + ')</br>' +
            'Missed Vote Rate: ' + member.missed_votes_pct + '% (' + member.missed_votes + '/' + member.total_votes + ')</br>' +
            'Votes with Party Rate: ' + member.votes_with_party_pct + '</br>' +
            'Website: ' + member.url + '</span>' +
            '</div>';
        document.body.innerHTML = document.body.innerHTML.replace(regex, tipHTML);
    }
}, 400);



/**
 * Returns a list of the first and last names
 * of every member of congress
 * @param heads headers for the API request
 */
function getMembers(heads) {
    let retValue = [];
    let index = 0;

    // Request the house...
    let reqURL = 'https://api.propublica.org/congress/v1/116/house/members.json';
    fetch(reqURL, heads)
        .then(function (resp) {
            return resp.json()
        })
        .then(function (data) {
            for (let rep of data.results[0].members) {
                retValue[index++] = rep;
            }
        });

    // ...and then the senate
    reqURL = 'https://api.propublica.org/congress/v1/116/senate/members.json';
    fetch(reqURL, heads)
        .then(function (resp) {
            return resp.json()
        })
        .then(function (data) {
            for (let rep of data.results[0].members) {
                retValue[index++] = rep;
            }
        });

    return retValue;
}
