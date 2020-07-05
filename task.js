'use strict';

class AlarmClock {
    constructor(alarmCollection = [], timerId = null) {
        this.alarmCollection = alarmCollection;
        this.timerId = timerId;
    };

    static checkID = (_id, array) => {
        if (array.length > 0) {
            if (array.filter(dict => dict.id === _id).length > 0) {
            return true;
            } else {
            return false;
            };
        } else {
            return false;
        };
    };

    addClock(time, callback, id) {
        if (!id) {
            throw new Error('Введите id будильника!');
        } else if (AlarmClock.checkID(id, this.alarmCollection) == true) {
            console.error('Такой id уже существует!');
        } else {
            this.alarmCollection.push({
                'id': id,
                'time': time,
                'callback': callback,
            });
        };
    };

    removeClock(id) {
        if (!id) {
            throw new Error('Введите id будильника!');
        } else {
            this.alarmCollection.splice(this.alarmCollection.findIndex(item => item['id'] === id), 1)
        };
    };

    getCurrentFormattedTime() {
        let hours = (new Date()).getHours();
        let minutes = (new Date()).getMinutes();
        return (`${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`);
    }

    static checkClock(id, array, time) {
        if (id) {
            if (array[array.findIndex(item => item['id'] === id)].time === time) {
              array[array.findIndex(item => item['id'] === id)].callback;
            };
        } else {
            array.forEach(item => {
                if (item.time === time) {
                item.callback;
                };
            });
        };
    };

    start() {
        if (!this.timerId) {
            this.timerId = setInterval(AlarmClock.checkClock(null,
                                                             this.alarmCollection,
                                                             this.getCurrentFormattedTime()), 1000);
        };
    }

    stop() {
        if (this.timerId) {
            clearTimeout(this.timerId);
            this.timerId = null;
        };
    };

    printAlarms() {
        this.alarmCollection.forEach(item => console.log(item));
    };

    clearAlarms() {
        this.stop();
        this.alarmCollection = [];
    };

};
