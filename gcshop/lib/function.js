module.exports = {
    dateOfEightDigit : () => {
        var today = new Date();
        var year = String(today.getFullYear());
        var month ;
        var day ;
        var hour;
        var minute;
        var second;
        if (today.getMonth() < 9)
            month = "0" + String(today.getMonth()+1);
        else
            month = String(today.getMonth()+1);

        if (today.getDate() < 10)
            day = "0" + String(today.getDate());
        else
            day = String(today.getDate());

        hour = String(today.getHours());
        minute = String(today.getMinutes());
        second = String(today.getSeconds());

        return year +"." + month + "." + day + "/" + hour + ":" + minute + ":" + second;
    },
    authIsOwner : (req, res) => {
        if (req.session.is_logined) {
            return true;
        } else {
            return false
        }
    },
    checkManager : (req) => {
        if (req.session.class === '00') return 'MANAGER';
        else if (req.session.class === '01') return 'ADMIN';
        else if (req.session.class === '02') return 'USER';
        else return 'NO';
    }, // Class Check Function
    errorMessage : (res, msg, href) => {
        res.write(`
        <script type="text/javascript">
        alert("ERROR :: ${msg}");
        location.href = "${href}";
        </script>`);
    },
    checkMenu : (req) => {
        if (req.session.class === '00') return 'menuForManager.ejs';
        else if (req.session.class === '01') return 'menuForManager.ejs';
        else if (req.session.class === '02') return 'menuForCustomer.ejs';
        else return 'menuForCustomer.ejs';
    },
    checkAuth : (req) => {
        return req.session.loginid;
    }
};