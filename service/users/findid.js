import req from "express/lib/request";
import res from "express/lib/response";
import {User} from "../../database/models/user";

const pname = req.body.name;

User.findById(pname, function(err, results) {
    results[0]._doc = undefined;
    if(err) {
        console.log('error')
        res.write('오류')
        return;
    }

    if(results.length > 0) {
        console.log('find');
        if(results[0]._doc.name === pname) {
            res.write('이름: ' + pname);
            res.write('id: ' + results[0]._doc.id);
            res.end();
        }
    } else {
        res.write('아이디: ' + pname);
        res.end();
    }
});