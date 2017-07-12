'use strict;'
const fs = require('fs');
const readline = require('readline');

const testers = new Map(), devices = new Map(), testDevices = new Map();

function readFileAndFillMap(file, cb) {
    return new Promise((resolve, reject) => {
        const reader = readline.createInterface({
            input: fs.createReadStream(file)
        });
        reader.on('line', line => cb(line));
        reader.on('close', () => resolve());
    });
}

function init() {
    return readFileAndFillMap('./config/testers.csv', line => {
        let [id, firstname, lastname, country, _] = line.split(',').map(item => item.replace(/"/g, ''));
        if (!isNaN(parseInt(id))) {
            testers[id] = testers[id] || [country, `${firstname} ${lastname}`];
        }
    }).then(() => {
        testDevices['*'] = new Map();
        testDevices['*']['*'] = new Map();
        return readFileAndFillMap('./config/tester_device.csv', line => {
            let [testerId, deviceId] = line.split(',').map(item => item.replace(/"/g, ''));
            if (!isNaN(parseInt(testerId))) {
                let country = testers[testerId][0];
                testDevices[deviceId] = testDevices[deviceId] || new Map();
                testDevices[deviceId][country] = testDevices[deviceId][country] || new Map();
                testDevices[deviceId][country][testerId] = 0;
                testDevices['*'][country] = testDevices['*'][country] || new Map();
                testDevices['*'][country][testerId] = 0;
                testDevices[deviceId]['*'] = testDevices[deviceId]['*'] || new Map();
                testDevices[deviceId]['*'][testerId] = 0;
                testDevices['*']['*'][testerId] = testDevices['*']['*'][testerId] || new Map();
                testDevices['*']['*'][testerId] = 0;
            }
        });
    }).then(() => {
        return readFileAndFillMap('./config/bugs.csv', line => {
            let [bugid, deviceId, testerId] = line.split(',').map(item => item.replace(/"/g, ''));
            if (!isNaN(parseInt(bugid))) {
                let country = testers[testerId][0];
                testDevices[deviceId][country][testerId] += 1;
                testDevices[deviceId]['*'][testerId] += 1;
                testDevices['*'][country][testerId] += 1;
                testDevices['*']['*'][testerId] += 1;
            }
        });
    });
}


readFileAndFillMap('./config/devices.csv', line => {
    let [id, devicename] = line.split(',').map(item => item.replace(/"/g, ''));
    if (!isNaN(parseInt(id))) {
        devices[id] = devices[id] || devicename;
    }
});

function searchByCountryAndDevice(country, deviceId) {
    const ret = {};
    deviceId.forEach(device => {
        country.forEach(c => {
            let ts = testDevices[device] && testDevices[device][c];
            for (let test in ts) {
                ret[test] = ret[test] || [...testers[test], 0];
                ret[test][ret[test].length - 1] += ts[test];
            }
        });
    });
    return ret;
}

function info() {
    return {
        countries: Array.from(Object.keys(testers).reduce((acc, id) => {
            acc.add(testers[id][0]);
            return acc;
        }, new Set())),
        devices: Object.keys(devices).map(id => {
            return {
                id,
                name: devices[id]
            }
        })
    }
}

module.exports = function() {
	return {
        init: init,
        search: searchByCountryAndDevice,
        info: info
	}
};