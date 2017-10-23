<template>
    <div class="full-height">
        <!-- <ui-head title="交易日历"></ui-head> -->
        <common-nav>
            <div slot="body">
                交易日历
            </div>
        </common-nav>
        <div class="container" style="padding:0 10px;">
            <vue-event-calendar :events="tradeEvents" @change-month="changeMonth" @change-day="changeDay"></vue-event-calendar>
        </div>
    </div>
</template>
<script>
import moment from "moment";
import {
    parts
} from "./../common/config/constants.js";
export default {
    data() {
            return {
                tes: [],
                calendar: {}
            }
        },
        created() {
            this.$post("newsBase", {
                pageSize: 100000,
                pageNo: 1,
                dateStart: "2007-01-01",
                dateEnd: "2027-01-01",
                codes: null,
                // part: parts.pbgjjyrl.part
            }).then(res => {
                for (let r of res.results) {
                    this.tes.push({
                        date: moment(r.createtime).format("YYYY/MM/DD"),
                        title: r.infotitle,
                        desc: r.remark,
                        id: r.id
                    });
                }
            });
        },
        methods: {
            changeDay(date) {
                console.log(date);
            },
            changeMonth(calendar) {
                this.calendar = calendar;
            }
        },
        computed: {
            tradeEvents() {
                return _.filter(this.tes, t => {
                    return moment(t.date, "YYYY/MM/DD").month() == this.calendar.curMonth;
                });
            }
        }
}
</script>
<style>
</style>
