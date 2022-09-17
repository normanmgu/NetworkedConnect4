const sendRequest = require("../utils/requestHelpers/sendRequest");
const parseInput = require("../utils/parseInput");


module.exports = async (req, res) =>{

    const { transceiver, username, id } = parseInput(req.body.duel);

    const errors = []; // All errors to be displayed to client are pushed here

    try{
        const request = await sendRequest(
            { username: username, id: id },
            { username: req.user.username, id: req.user.id },
            1
        );
        console.log(request)
        // Send user to a game room that should be the concatanation of their requester and recipiants id.
        return res.redirect(`/game?transceiver=${transceiver}&opp_username=${username}&opp_id=${id}&username=${req.user.username}&id=${req.user.id}`);
    }
    catch(e) {
        console.log(e);
        return res.redirect("/");
    }
}
      