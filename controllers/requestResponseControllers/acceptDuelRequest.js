const parseInput = require("../../utils/parseInput");
const acceptDuelRequest = require("../../utils/requestHelpers/acceptRequest");``

module.exports = (req, res) =>{

    const { transciever, username, id } = parseInput(req.body.duel);

    try{
        let request = acceptDuelRequest(
            { username: req.user.username, id: req.user.id },
            { username: username, id: id },
            1
        )
        if(!request) throw Error("unable to delete");
    }
    catch(e) {
        console.log(e);
    }

    res.redirect(`/game?transceiver=recipient&opp_username=${username}&opp_id=${id}&username=${req.user.username}&id=${req.user.id}`);
}