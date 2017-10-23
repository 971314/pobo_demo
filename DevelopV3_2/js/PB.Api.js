/**
 * Created by pobo on 2016/11/3.
 */
!function (global) {
    var root = this;

    var pbEngion = function () {
    };

    var pbE = new pbEngion();

    pbE.SYS = function () {
        if(root.pbESYS)
            return root.pbESYS;
        else
            return null;
    }

    pbE.WT = function () {
        if(root.pbEWT)
            return root.pbEWT;
        else
            return  null;
    }
    pbE.MSG = function () {
        if(root.pbEMSG)
            return root.pbEMSG;
        else
            return  null;
    }
    pbE.HQ = function () {
        if(root.pbEHQ)
            return root.pbEHQ;
        else
            return  null;

    }
    pbE.INFO = function () {
        if(root.pbEINFO)
            return root.pbEINFO;
        else
            return  null;
    }

    pbE.ZX = function () {
        if(root.pbEZX)
            return root.pbEZX;
        else
            return  null;
    }

    pbE.WS = function () {
        if(root.pbEWS)
            return root.pbEWS;
        else
            return  null;
    }

    pbE.GP = function () {
        if(root.pbEGP)
            return root.pbEGP;
        else
            return  null;
    }
    !global.pbE && (global.pbE = pbE);
}(window)
