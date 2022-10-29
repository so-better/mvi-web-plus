<template>
    <div class="mvi-date-picker">
        <Picker :options="pickerOptions" :show-toolbar="showToolbar" :title="title" :title-class="titleClass" :confirm-text="confirmText" :cancel-text="cancelText" :confirm-class="confirmClass" :cancel-class="cancelClass" :loading="loading" :visible-counts="visibleCounts" :select-height="selectHeight" @change="dateChange" @confirm="bindConfirm" @cancel="bindCancel"></Picker>
    </div>
</template>

<script>
import { Dap } from '../dap'
import { Picker } from '../picker'
export default {
    name: 'm-date-picker',
    emits: ['update:modelValue', 'confirm', 'cancel', 'change'],
    props: {
        //日期值
        modelValue: {
            type: Date,
            default: function () {
                return new Date()
            }
        },
        //默认开始时间1970年1月1日00:00:00
        startDate: {
            type: Date,
            default: function () {
                let date = new Date()
                date.setFullYear(1970)
                date.setMonth(0)
                date.setDate(1)
                date.setHours(0)
                date.setMinutes(0)
                date.setSeconds(0)
                date.setMilliseconds(0)
                return date
            }
        },
        //默认结束时间2099年12月31日23:59:59
        endDate: {
            type: Date,
            default: function () {
                let date = new Date()
                date.setFullYear(2099)
                date.setMonth(11)
                date.setDate(31)
                date.setHours(23)
                date.setMinutes(59)
                date.setSeconds(59)
                date.setMilliseconds(999)
                return date
            }
        },
        //模式
        mode: {
            type: String,
            default: 'date',
            validator(value) {
                return ['date', 'datetime', 'time', 'month', 'year'].includes(
                    value
                )
            }
        },
        //是否显示顶部标题栏
        showToolbar: {
            type: Boolean,
            default: true
        },
        //标题
        title: {
            type: String,
            default: null
        },
        //标题class
        titleClass: {
            type: String,
            default: null
        },
        //确认文字
        confirmText: {
            type: String,
            default: '确定'
        },
        //取消文字
        cancelText: {
            type: String,
            default: '取消'
        },
        //确认按钮class
        confirmClass: {
            type: String,
            default: null
        },
        //取消按钮class
        cancelClass: {
            type: String,
            default: null
        },
        //是否显示加载状态
        loading: {
            type: Boolean,
            default: false
        },
        //可见选项个数
        visibleCounts: {
            type: Number,
            default: 5
        },
        //选择框高度
        selectHeight: {
            type: String,
            default: '0.88rem'
        }
    },
    computed: {
        //选择的年与开始年是否相等
        equalStartYear() {
            return (
                this.selectedDate.getFullYear() == this.startDate.getFullYear()
            )
        },
        //选择的月与开始月是否相等
        equalStartMonth() {
            return this.selectedDate.getMonth() == this.startDate.getMonth()
        },
        //选择的日期与开始日期是否相等
        equalStartDay() {
            return this.selectedDate.getDate() == this.startDate.getDate()
        },
        //选择的时与开始时是否相等
        equalStartHour() {
            return this.selectedDate.getHours() == this.startDate.getHours()
        },
        //选择的分与开始分是否相等
        equalStartMin() {
            return this.selectedDate.getMinutes() == this.startDate.getMinutes()
        },
        //选择的年与结束年是否相等
        equalEndYear() {
            return this.selectedDate.getFullYear() == this.endDate.getFullYear()
        },
        //选择的月与结束月是否相等
        equalEndMonth() {
            return this.selectedDate.getMonth() == this.endDate.getMonth()
        },
        //选择的日期与结束日期是否相等
        equalEndDay() {
            return this.selectedDate.getDate() == this.endDate.getDate()
        },
        //选择的时与结束时是否相等
        equalEndHour() {
            return this.selectedDate.getHours() == this.endDate.getHours()
        },
        //选择的分与结束分是否相等
        equalEndMin() {
            return this.selectedDate.getMinutes() == this.endDate.getMinutes()
        },
        //年数组
        yearArray() {
            let years = []
            let startYear = this.startDate.getFullYear()
            let endYear = this.endDate.getFullYear()
            for (let i = startYear; i <= endYear; i++) {
                years.push({
                    year: i,
                    yearFormat: `${i}年`,
                    current: i == this.selectedDate.getFullYear()
                })
            }
            return years
        },
        //月数组
        monthArray() {
            let months = []
            if (
                this.selectedDate.getFullYear() == this.startDate.getFullYear()
            ) {
                let startMonth = this.startDate.getMonth() + 1
                let endMonth = 12
                if (
                    this.selectedDate.getFullYear() ==
                    this.endDate.getFullYear()
                ) {
                    endMonth = this.endDate.getMonth() + 1
                }
                for (let i = startMonth; i <= endMonth; i++) {
                    months.push({
                        month: i,
                        monthFormat: `${i}月`,
                        current: i == this.selectedDate.getMonth() + 1
                    })
                }
            } else if (
                this.selectedDate.getFullYear() == this.endDate.getFullYear()
            ) {
                let endMonth = this.endDate.getMonth() + 1
                for (let i = 1; i <= endMonth; i++) {
                    months.push({
                        month: i,
                        monthFormat: `${i}月`,
                        current: i == this.selectedDate.getMonth() + 1
                    })
                }
            } else {
                for (let i = 1; i <= 12; i++) {
                    months.push({
                        month: i,
                        monthFormat: `${i}月`,
                        current: i == this.selectedDate.getMonth() + 1
                    })
                }
            }
            return months
        },
        //日期数组
        dayArray() {
            let totalDays = Dap.date.getDays(
                this.selectedDate.getFullYear(),
                this.selectedDate.getMonth() + 1
            )
            let days = []
            if (
                this.selectedDate.getFullYear() ==
                    this.startDate.getFullYear() &&
                this.selectedDate.getMonth() == this.startDate.getMonth()
            ) {
                let startDay = this.startDate.getDate()
                let endDay = totalDays
                if (
                    this.selectedDate.getFullYear() ==
                        this.endDate.getFullYear() &&
                    this.selectedDate.getMonth() == this.endDate.getMonth()
                ) {
                    endDay = this.endDate.getDate()
                }
                for (let i = startDay; i <= endDay; i++) {
                    days.push({
                        day: i,
                        dayFormat: `${i}日`,
                        current: i == this.selectedDate.getDate()
                    })
                }
            } else if (
                this.selectedDate.getFullYear() == this.endDate.getFullYear() &&
                this.selectedDate.getMonth() == this.endDate.getMonth()
            ) {
                let endDay = this.endDate.getDate()
                for (let i = 1; i <= endDay; i++) {
                    days.push({
                        day: i,
                        dayFormat: `${i}日`,
                        current: i == this.selectedDate.getDate()
                    })
                }
            } else {
                for (let i = 1; i <= totalDays; i++) {
                    days.push({
                        day: i,
                        dayFormat: `${i}日`,
                        current: i == this.selectedDate.getDate()
                    })
                }
            }
            return days
        },
        //时数组
        hourArray() {
            let hours = []
            //当前年月日等于开始年月日
            if (
                this.selectedDate.getFullYear() ==
                    this.startDate.getFullYear() &&
                this.selectedDate.getMonth() == this.startDate.getMonth() &&
                this.selectedDate.getDate() == this.startDate.getDate()
            ) {
                let startHour = this.startDate.getHours()
                let endHour = 23
                //考虑开始年月日和结束年月日为同一天的情况
                if (
                    this.selectedDate.getFullYear() ==
                        this.endDate.getFullYear() &&
                    this.selectedDate.getMonth() == this.endDate.getMonth() &&
                    this.selectedDate.getDate() == this.endDate.getDate()
                ) {
                    endHour = this.endDate.getHours()
                }
                for (let i = startHour; i <= endHour; i++) {
                    hours.push({
                        hour: i,
                        hourFormat: `${i < 10 ? '0' + i : i}时`,
                        current: this.selectedDate.getHours() == i
                    })
                }
            } else if (
                this.selectedDate.getFullYear() == this.endDate.getFullYear() &&
                this.selectedDate.getMonth() == this.endDate.getMonth() &&
                this.selectedDate.getDate() == this.endDate.getDate()
            ) {
                let endHour = this.endDate.getHours()
                for (let i = 0; i <= endHour; i++) {
                    hours.push({
                        hour: i,
                        hourFormat: `${i < 10 ? '0' + i : i}时`,
                        current: this.selectedDate.getHours() == i
                    })
                }
            } else {
                for (let i = 0; i <= 23; i++) {
                    hours.push({
                        hour: i,
                        hourFormat: `${i < 10 ? '0' + i : i}时`,
                        current: this.selectedDate.getHours() == i
                    })
                }
            }
            return hours
        },
        //分钟数组
        minArray() {
            let mins = []
            //当前年月日时和开始年月日时相同
            if (
                this.selectedDate.getFullYear() ==
                    this.startDate.getFullYear() &&
                this.selectedDate.getMonth() == this.startDate.getMonth() &&
                this.selectedDate.getDate() == this.startDate.getDate() &&
                this.selectedDate.getHours() == this.startDate.getHours()
            ) {
                let startMin = this.startDate.getMinutes()
                let endMin = 59
                //开始年月日时和结束年月日时相同
                if (
                    this.selectedDate.getFullYear() ==
                        this.endDate.getFullYear() &&
                    this.selectedDate.getMonth() == this.endDate.getMonth() &&
                    this.selectedDate.getDate() == this.endDate.getDate() &&
                    this.selectedDate.getHours() == this.endDate.getHours()
                ) {
                    endMin = this.endDate.getMinutes()
                }
                for (let i = startMin; i <= endMin; i++) {
                    mins.push({
                        min: i,
                        minFormat: `${i < 10 ? '0' + i : i}分`,
                        current: this.selectedDate.getMinutes() == i
                    })
                }
            } else if (
                this.selectedDate.getFullYear() == this.endDate.getFullYear() &&
                this.selectedDate.getMonth() == this.endDate.getMonth() &&
                this.selectedDate.getDate() == this.endDate.getDate() &&
                this.selectedDate.getHours() == this.endDate.getHours()
            ) {
                let endMin = this.endDate.getMinutes()
                for (let i = 0; i <= endMin; i++) {
                    mins.push({
                        min: i,
                        minFormat: `${i < 10 ? '0' + i : i}分`,
                        current: this.selectedDate.getMinutes() == i
                    })
                }
            } else {
                for (let i = 0; i <= 59; i++) {
                    mins.push({
                        min: i,
                        minFormat: `${i < 10 ? '0' + i : i}分`,
                        current: this.selectedDate.getMinutes() == i
                    })
                }
            }
            return mins
        },
        //picker数据
        pickerOptions() {
            let years = []
            let defaultYearIndex = 0
            this.yearArray.forEach((item, index) => {
                years.push(item.yearFormat)
                if (item.current) {
                    defaultYearIndex = index
                }
            })

            let months = []
            let defaultMonthIndex = 0
            this.monthArray.forEach((item, index) => {
                months.push(item.monthFormat)
                if (item.current) {
                    defaultMonthIndex = index
                }
            })

            let days = []
            let defaultDayIndex = 0
            this.dayArray.forEach((item, index) => {
                days.push(item.dayFormat)
                if (item.current) {
                    defaultDayIndex = index
                }
            })

            let hours = []
            let defaultHourIndex = 0
            this.hourArray.forEach((item, index) => {
                hours.push(item.hourFormat)
                if (item.current) {
                    defaultHourIndex = index
                }
            })

            let mins = []
            let defaultMinIndex = 0
            this.minArray.forEach((item, index) => {
                mins.push(item.minFormat)
                if (item.current) {
                    defaultMinIndex = index
                }
            })

            if (this.mode == 'date') {
                return [
                    {
                        values: years,
                        defaultIndex: defaultYearIndex
                    },
                    {
                        values: months,
                        defaultIndex: defaultMonthIndex
                    },
                    {
                        values: days,
                        defaultIndex: defaultDayIndex
                    }
                ]
            } else if (this.mode == 'year') {
                return {
                    values: years,
                    defaultIndex: defaultYearIndex
                }
            } else if (this.mode == 'month') {
                return [
                    {
                        values: years,
                        defaultIndex: defaultYearIndex
                    },
                    {
                        values: months,
                        defaultIndex: defaultMonthIndex
                    }
                ]
            } else if (this.mode == 'datetime') {
                return [
                    {
                        values: years,
                        defaultIndex: defaultYearIndex
                    },
                    {
                        values: months,
                        defaultIndex: defaultMonthIndex
                    },
                    {
                        values: days,
                        defaultIndex: defaultDayIndex
                    },
                    {
                        values: hours,
                        defaultIndex: defaultHourIndex
                    },
                    {
                        values: mins,
                        defaultIndex: defaultMinIndex
                    }
                ]
            } else if (this.mode == 'time') {
                return [
                    {
                        values: hours,
                        defaultIndex: defaultHourIndex
                    },
                    {
                        values: mins,
                        defaultIndex: defaultMinIndex
                    }
                ]
            }
        },
        //选择的日期
        selectedDate: {
            set(value) {
                this.$emit('update:modelValue', value)
                this.$emit('change', value)
            },
            get() {
                if (this.modelValue instanceof Date) {
                    if (this.modelValue.getTime() < this.startDate.getTime()) {
                        return this.startDate
                    } else if (
                        this.modelValue.getTime() > this.endDate.getTime()
                    ) {
                        return this.endDate
                    } else {
                        return this.modelValue
                    }
                } else {
                    return new Date()
                }
            }
        }
    },
    components: {
        Picker
    },
    methods: {
        //日期变更
        dateChange(res) {
            if (this.mode == 'date') {
                if (res.columnIndex == 0) {
                    //修改年
                    let year = this.yearArray[res.selected[0].index].year
                    this.selectedDate = new Date(
                        this.selectedDate.setFullYear(year)
                    )
                    if (this.equalEndYear) {
                        if (
                            this.selectedDate.getMonth() >
                            this.endDate.getMonth()
                        ) {
                            this.selectedDate = new Date(
                                this.selectedDate.setMonth(
                                    this.endDate.getMonth()
                                )
                            )
                        }
                        if (this.equalEndMonth) {
                            if (
                                this.selectedDate.getDate() >
                                this.endDate.getDate()
                            ) {
                                this.selectedDate = new Date(
                                    this.selectedDate.setDate(
                                        this.endDate.getDate()
                                    )
                                )
                            }
                        }
                    }
                    if (this.equalStartYear) {
                        if (
                            this.selectedDate.getMonth() <
                            this.startDate.getMonth()
                        ) {
                            this.selectedDate = new Date(
                                this.selectedDate.setMonth(
                                    this.startDate.getMonth()
                                )
                            )
                        }
                        if (this.equalStartMonth) {
                            if (
                                this.selectedDate.getDate() <
                                this.startDate.getDate()
                            ) {
                                this.selectedDate = new Date(
                                    this.selectedDate.setDate(
                                        this.startDate.getDate()
                                    )
                                )
                            }
                        }
                    }
                } else if (res.columnIndex == 1) {
                    //修改月
                    let month = this.monthArray[res.selected[1].index].month
                    let totalDays = Dap.date.getDays(
                        this.selectedDate.getFullYear(),
                        month
                    )
                    if (this.selectedDate.getDate() > totalDays) {
                        this.selectedDate.setDate(totalDays)
                    }
                    this.selectedDate = new Date(
                        this.selectedDate.setMonth(month - 1)
                    )
                    if (this.equalEndYear && this.equalEndMonth) {
                        if (
                            this.selectedDate.getDate() > this.endDate.getDate()
                        ) {
                            this.selectedDate = new Date(
                                this.selectedDate.setDate(
                                    this.endDate.getDate()
                                )
                            )
                        }
                    }
                    if (this.equalStartYear && this.equalStartMonth) {
                        if (
                            this.selectedDate.getDate() <
                            this.startDate.getDate()
                        ) {
                            this.selectedDate = new Date(
                                this.selectedDate.setDate(
                                    this.startDate.getDate()
                                )
                            )
                        }
                    }
                } else if (res.columnIndex == 2) {
                    //修改日
                    let day = this.dayArray[res.selected[2].index].day
                    this.selectedDate = new Date(this.selectedDate.setDate(day))
                }
            } else if (this.mode == 'month') {
                if (res.columnIndex == 0) {
                    //修改年
                    let year = this.yearArray[res.selected[0].index].year
                    this.selectedDate = new Date(
                        this.selectedDate.setFullYear(year)
                    )
                    if (this.equalEndYear) {
                        if (
                            this.selectedDate.getMonth() >
                            this.endDate.getMonth()
                        ) {
                            this.selectedDate = new Date(
                                this.selectedDate.setMonth(
                                    this.endDate.getMonth()
                                )
                            )
                        }
                        if (this.equalEndMonth) {
                            if (
                                this.selectedDate.getDate() >
                                this.endDate.getDate()
                            ) {
                                this.selectedDate = new Date(
                                    this.selectedDate.setDate(
                                        this.endDate.getDate()
                                    )
                                )
                            }
                        }
                    }
                    if (this.equalStartYear) {
                        if (
                            this.selectedDate.getMonth() <
                            this.startDate.getMonth()
                        ) {
                            this.selectedDate = new Date(
                                this.selectedDate.setMonth(
                                    this.startDate.getMonth()
                                )
                            )
                        }
                        if (this.equalStartMonth) {
                            if (
                                this.selectedDate.getDate() <
                                this.startDate.getDate()
                            ) {
                                this.selectedDate = new Date(
                                    this.selectedDate.setDate(
                                        this.startDate.getDate()
                                    )
                                )
                            }
                        }
                    }
                } else if (res.columnIndex == 1) {
                    //修改月
                    let month = this.monthArray[res.selected[1].index].month
                    let totalDays = Dap.date.getDays(
                        this.selectedDate.getFullYear(),
                        month
                    )
                    if (this.selectedDate.getDate() > totalDays) {
                        this.selectedDate.setDate(totalDays)
                    }
                    this.selectedDate = new Date(
                        this.selectedDate.setMonth(month - 1)
                    )
                    if (this.equalEndYear && this.equalEndMonth) {
                        if (
                            this.selectedDate.getDate() > this.endDate.getDate()
                        ) {
                            this.selectedDate = new Date(
                                this.selectedDate.setDate(
                                    this.endDate.getDate()
                                )
                            )
                        }
                    }
                    if (this.equalStartYear && this.equalStartMonth) {
                        if (
                            this.selectedDate.getDate() <
                            this.startDate.getDate()
                        ) {
                            this.selectedDate = new Date(
                                this.selectedDate.setDate(
                                    this.startDate.getDate()
                                )
                            )
                        }
                    }
                }
            } else if (this.mode == 'year') {
                if (res.columnIndex == 0) {
                    //修改年
                    let year = this.yearArray[res.selected.index].year
                    this.selectedDate = new Date(
                        this.selectedDate.setFullYear(year)
                    )
                    if (this.equalEndYear) {
                        if (
                            this.selectedDate.getMonth() >
                            this.endDate.getMonth()
                        ) {
                            this.selectedDate = new Date(
                                this.selectedDate.setMonth(
                                    this.endDate.getMonth()
                                )
                            )
                        }
                        if (this.equalEndMonth) {
                            if (
                                this.selectedDate.getDate() >
                                this.endDate.getDate()
                            ) {
                                this.selectedDate = new Date(
                                    this.selectedDate.setDate(
                                        this.endDate.getDate()
                                    )
                                )
                            }
                        }
                    }
                    if (this.equalStartYear) {
                        if (
                            this.selectedDate.getMonth() <
                            this.startDate.getMonth()
                        ) {
                            this.selectedDate = new Date(
                                this.selectedDate.setMonth(
                                    this.startDate.getMonth()
                                )
                            )
                        }
                        if (this.equalStartMonth) {
                            if (
                                this.selectedDate.getDate() <
                                this.startDate.getDate()
                            ) {
                                this.selectedDate = new Date(
                                    this.selectedDate.setDate(
                                        this.startDate.getDate()
                                    )
                                )
                            }
                        }
                    }
                }
            } else if (this.mode == 'datetime') {
                if (res.columnIndex == 0) {
                    //修改年
                    let year = this.yearArray[res.selected[0].index].year
                    this.selectedDate = new Date(
                        this.selectedDate.setFullYear(year)
                    )
                    if (this.equalEndYear) {
                        if (
                            this.selectedDate.getMonth() >
                            this.endDate.getMonth()
                        ) {
                            this.selectedDate = new Date(
                                this.selectedDate.setMonth(
                                    this.endDate.getMonth()
                                )
                            )
                        }
                        if (this.equalEndMonth) {
                            if (
                                this.selectedDate.getDate() >
                                this.endDate.getDate()
                            ) {
                                this.selectedDate = new Date(
                                    this.selectedDate.setDate(
                                        this.endDate.getDate()
                                    )
                                )
                            }
                            if (this.equalEndDay) {
                                if (
                                    this.selectedDate.getHours() >
                                    this.endDate.getHours()
                                ) {
                                    this.selectedDate = new Date(
                                        this.selectedDate.setHours(
                                            this.endDate.getHours()
                                        )
                                    )
                                }
                                if (this.equalEndHour) {
                                    if (
                                        this.selectedDate.getMinutes() >
                                        this.endDate.getMinutes()
                                    ) {
                                        this.selectedDate = new Date(
                                            this.selectedDate.setMinutes(
                                                this.endDate.getMinutes()
                                            )
                                        )
                                    }
                                }
                            }
                        }
                    }
                    if (this.equalStartYear) {
                        if (
                            this.selectedDate.getMonth() <
                            this.startDate.getMonth()
                        ) {
                            this.selectedDate = new Date(
                                this.selectedDate.setMonth(
                                    this.startDate.getMonth()
                                )
                            )
                        }
                        if (this.equalStartMonth) {
                            if (
                                this.selectedDate.getDate() <
                                this.startDate.getDate()
                            ) {
                                this.selectedDate = new Date(
                                    this.selectedDate.setDate(
                                        this.startDate.getDate()
                                    )
                                )
                            }
                            if (this.equalStartDay) {
                                if (
                                    this.selectedDate.getHours() <
                                    this.startDate.getHours()
                                ) {
                                    this.selectedDate = new Date(
                                        this.selectedDate.setHours(
                                            this.startDate.getHours()
                                        )
                                    )
                                }
                                if (this.equalStartHour) {
                                    if (
                                        this.selectedDate.getMinutes() <
                                        this.startDate.getMinutes()
                                    ) {
                                        this.selectedDate = new Date(
                                            this.selectedDate.setMinutes(
                                                this.startDate.getMinutes()
                                            )
                                        )
                                    }
                                }
                            }
                        }
                    }
                } else if (res.columnIndex == 1) {
                    //修改月
                    let month = this.monthArray[res.selected[1].index].month
                    let totalDays = Dap.date.getDays(
                        this.selectedDate.getFullYear(),
                        month
                    )
                    if (this.selectedDate.getDate() > totalDays) {
                        this.selectedDate.setDate(totalDays)
                    }
                    this.selectedDate = new Date(
                        this.selectedDate.setMonth(month - 1)
                    )
                    if (this.equalEndYear && this.equalEndMonth) {
                        if (
                            this.selectedDate.getDate() > this.endDate.getDate()
                        ) {
                            this.selectedDate = new Date(
                                this.selectedDate.setDate(
                                    this.endDate.getDate()
                                )
                            )
                        }
                        if (this.equalEndDay) {
                            if (
                                this.selectedDate.getHours() >
                                this.endDate.getHours()
                            ) {
                                this.selectedDate = new Date(
                                    this.selectedDate.setHours(
                                        this.endDate.getHours()
                                    )
                                )
                            }
                            if (this.equalEndHour) {
                                if (
                                    this.selectedDate.getMinutes() >
                                    this.endDate.getMinutes()
                                ) {
                                    this.selectedDate = new Date(
                                        this.selectedDate.setMinutes(
                                            this.endDate.getMinutes()
                                        )
                                    )
                                }
                            }
                        }
                    }
                    if (this.equalStartYear && this.equalStartMonth) {
                        if (
                            this.selectedDate.getDate() <
                            this.startDate.getDate()
                        ) {
                            this.selectedDate = new Date(
                                this.selectedDate.setDate(
                                    this.startDate.getDate()
                                )
                            )
                        }
                        if (this.equalStartDay) {
                            if (
                                this.selectedDate.getHours() <
                                this.startDate.getHours()
                            ) {
                                this.selectedDate = new Date(
                                    this.selectedDate.setHours(
                                        this.startDate.getHours()
                                    )
                                )
                            }
                            if (this.equalStartHour) {
                                if (
                                    this.selectedDate.getMinutes() <
                                    this.startDate.getMinutes()
                                ) {
                                    this.selectedDate = new Date(
                                        this.selectedDate.setMinutes(
                                            this.startDate.getMinutes()
                                        )
                                    )
                                }
                            }
                        }
                    }
                } else if (res.columnIndex == 2) {
                    //修改日
                    let day = this.dayArray[res.selected[2].index].day
                    this.selectedDate = new Date(this.selectedDate.setDate(day))
                    if (
                        this.equalEndYear &&
                        this.equalEndMonth &&
                        this.equalEndDay
                    ) {
                        if (
                            this.selectedDate.getHours() >
                            this.endDate.getHours()
                        ) {
                            this.selectedDate = new Date(
                                this.selectedDate.setHours(
                                    this.endDate.getHours()
                                )
                            )
                        }
                        if (this.equalEndHour) {
                            if (
                                this.selectedDate.getMinutes() >
                                this.endDate.getMinutes()
                            ) {
                                this.selectedDate = new Date(
                                    this.selectedDate.setMinutes(
                                        this.endDate.getMinutes()
                                    )
                                )
                            }
                        }
                    }
                    if (
                        this.equalStartYear &&
                        this.equalStartMonth &&
                        this.equalStartDay
                    ) {
                        if (
                            this.selectedDate.getHours() <
                            this.startDate.getHours()
                        ) {
                            this.selectedDate = new Date(
                                this.selectedDate.setHours(
                                    this.startDate.getHours()
                                )
                            )
                        }
                        if (this.equalStartHour) {
                            if (
                                this.selectedDate.getMinutes() <
                                this.startDate.getMinutes()
                            ) {
                                this.selectedDate = new Date(
                                    this.selectedDate.setMinutes(
                                        this.startDate.getMinutes()
                                    )
                                )
                            }
                        }
                    }
                } else if (res.columnIndex == 3) {
                    //修改时
                    let hour = this.hourArray[res.selected[3].index].hour
                    this.selectedDate = new Date(
                        this.selectedDate.setHours(hour)
                    )
                    if (
                        this.equalEndYear &&
                        this.equalEndMonth &&
                        this.equalEndDay &&
                        this.equalEndHour
                    ) {
                        if (
                            this.selectedDate.getMinutes() >
                            this.endDate.getMinutes()
                        ) {
                            this.selectedDate = new Date(
                                this.selectedDate.setMinutes(
                                    this.endDate.getMinutes()
                                )
                            )
                        }
                    }
                    if (
                        this.equalStartYear &&
                        this.equalStartMonth &&
                        this.equalStartDay &&
                        this.equalStartHour
                    ) {
                        if (
                            this.selectedDate.getMinutes() <
                            this.startDate.getMinutes()
                        ) {
                            this.selectedDate = new Date(
                                this.selectedDate.setMinutes(
                                    this.startDate.getMinutes()
                                )
                            )
                        }
                    }
                } else if (res.columnIndex == 4) {
                    //修改分
                    let min = this.minArray[res.selected[4].index].min
                    this.selectedDate = new Date(
                        this.selectedDate.setMinutes(min)
                    )
                }
            } else if (this.mode == 'time') {
                if (res.columnIndex == 0) {
                    //修改时
                    let hour = this.hourArray[res.selected[0].index].hour
                    this.selectedDate = new Date(
                        this.selectedDate.setHours(hour)
                    )
                    if (
                        this.equalEndYear &&
                        this.equalEndMonth &&
                        this.equalEndDay &&
                        this.equalEndHour
                    ) {
                        if (
                            this.selectedDate.getMinutes() >
                            this.endDate.getMinutes()
                        ) {
                            this.selectedDate = new Date(
                                this.selectedDate.setMinutes(
                                    this.endDate.getMinutes()
                                )
                            )
                        }
                    }
                    if (
                        this.equalStartYear &&
                        this.equalStartMonth &&
                        this.equalStartDay &&
                        this.equalStartHour
                    ) {
                        if (
                            this.selectedDate.getMinutes() <
                            this.startDate.getMinutes()
                        ) {
                            this.selectedDate = new Date(
                                this.selectedDate.setMinutes(
                                    this.startDate.getMinutes()
                                )
                            )
                        }
                    }
                } else if (res.columnIndex == 1) {
                    //修改分
                    let min = this.minArray[res.selected[1].index].min
                    this.selectedDate = new Date(
                        this.selectedDate.setMinutes(min)
                    )
                }
            }
        },
        //点击确定
        bindConfirm() {
            let year = this.selectedDate.getFullYear()
            let month = this.selectedDate.getMonth() + 1
            let date = this.selectedDate.getDate()
            let hour = this.selectedDate.getHours()
            let minute = this.selectedDate.getMinutes()

            if (this.mode == 'date') {
                let iosFormat =
                    year +
                    '/' +
                    (month < 10 ? '0' + month : month) +
                    '/' +
                    (date < 10 ? '0' + date : date)
                let format =
                    year +
                    '-' +
                    (month < 10 ? '0' + month : month) +
                    '-' +
                    (date < 10 ? '0' + date : date)
                this.$emit('confirm', {
                    year,
                    month,
                    date,
                    value: this.selectedDate,
                    iosFormat,
                    format
                })
            } else if (this.mode == 'datetime') {
                let iosFormat =
                    year +
                    '/' +
                    (month < 10 ? '0' + month : month) +
                    '/' +
                    (date < 10 ? '0' + date : date) +
                    ' ' +
                    (hour < 10 ? '0' + hour : hour) +
                    ':' +
                    (minute < 10 ? '0' + minute : minute)
                let format =
                    year +
                    '-' +
                    (month < 10 ? '0' + month : month) +
                    '-' +
                    (date < 10 ? '0' + date : date) +
                    ' ' +
                    (hour < 10 ? '0' + hour : hour) +
                    ':' +
                    (minute < 10 ? '0' + minute : minute)
                this.$emit('confirm', {
                    year,
                    month,
                    date,
                    hour,
                    minute,
                    value: this.selectedDate,
                    iosFormat,
                    format
                })
            } else if (this.mode == 'time') {
                let format =
                    (hour < 10 ? '0' + hour : hour) +
                    ':' +
                    (minute < 10 ? '0' + minute : minute)
                this.$emit('confirm', {
                    hour,
                    minute,
                    value: this.selectedDate,
                    format
                })
            } else if (this.mode == 'year') {
                this.$emit('confirm', {
                    year,
                    value: this.selectedDate
                })
            } else if (this.mode == 'month') {
                let iosFormat = year + '/' + (month < 10 ? '0' + month : month)
                let format = year + '-' + (month < 10 ? '0' + month : month)
                this.$emit('confirm', {
                    year,
                    month,
                    value: this.selectedDate,
                    iosFormat,
                    format
                })
            }
        },
        //点击取消
        bindCancel() {
            let year = this.selectedDate.getFullYear()
            let month = this.selectedDate.getMonth() + 1
            let date = this.selectedDate.getDate()
            let hour = this.selectedDate.getHours()
            let minute = this.selectedDate.getMinutes()

            if (this.mode == 'date') {
                let iosFormat =
                    year +
                    '/' +
                    (month < 10 ? '0' + month : month) +
                    '/' +
                    (date < 10 ? '0' + date : date)
                let format =
                    year +
                    '-' +
                    (month < 10 ? '0' + month : month) +
                    '-' +
                    (date < 10 ? '0' + date : date)
                this.$emit('cancel', {
                    year,
                    month,
                    date,
                    value: this.selectedDate,
                    iosFormat,
                    format
                })
            } else if (this.mode == 'datetime') {
                let iosFormat =
                    year +
                    '/' +
                    (month < 10 ? '0' + month : month) +
                    '/' +
                    (date < 10 ? '0' + date : date) +
                    ' ' +
                    (hour < 10 ? '0' + hour : hour) +
                    ':' +
                    (minute < 10 ? '0' + minute : minute)
                let format =
                    year +
                    '-' +
                    (month < 10 ? '0' + month : month) +
                    '-' +
                    (date < 10 ? '0' + date : date) +
                    ' ' +
                    (hour < 10 ? '0' + hour : hour) +
                    ':' +
                    (minute < 10 ? '0' + minute : minute)
                this.$emit('cancel', {
                    year,
                    month,
                    date,
                    hour,
                    minute,
                    value: this.selectedDate,
                    iosFormat,
                    format
                })
            } else if (this.mode == 'time') {
                let format =
                    (hour < 10 ? '0' + hour : hour) +
                    ':' +
                    (minute < 10 ? '0' + minute : minute)
                this.$emit('cancel', {
                    hour,
                    minute,
                    value: this.selectedDate,
                    format
                })
            } else if (this.mode == 'year') {
                this.$emit('cancel', {
                    year,
                    value: this.selectedDate
                })
            } else if (this.mode == 'month') {
                let iosFormat = year + '/' + (month < 10 ? '0' + month : month)
                let format = year + '-' + (month < 10 ? '0' + month : month)
                this.$emit('cancel', {
                    year,
                    month,
                    value: this.selectedDate,
                    iosFormat,
                    format
                })
            }
        }
    }
}
</script>

<style lang="less" scoped>
@import '../../css/mvi-basic.less';

.mvi-date-picker {
    display: block;
    width: 100%;
    position: relative;
}
</style>
