import req from "express/lib/request";
import res from "express/lib/response";
import {User} from "../../database/models/user";

const pid = req.body.id;
const pname = req.body.name;

User.findById(pid, function(err, results) {
    if(err) {
        console.log('error')
        res.write('error')
        return;
    }

    if(results.length > 0) {
        console.log('find');
        if(results[0]._doc.id === pid && results[0]._doc.name === pname) {
            res.write('아이디: ' + pid);
            res.write('이름: ' + pname);
            res.write('비밀번호: ' + results[0]._doc.password);
            res.end();
        }
    } else {
        res.write('아이디: ' + pid);
        res.write('비밀번호를 찾지 못했습니다.');
        res.end();
    }
});