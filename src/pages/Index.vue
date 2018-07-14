<template>
    <div class="main">
        <div>
            <ul class="count">
                <h2>统计面板</h2>
                <li>当前成本：{{totalCost}}</li>
                <li>预计销售额：{{totalSell}}</li>
                <li>预计利润：{{totalSell - totalCost}}</li>
                <li>已得利润：{{totalGet}}</li>
            </ul>
        </div>
        <div class="get-good">
            <h2>收购商品</h2>
            <div>
                <span>商品名称：</span><input type="text" v-model="newName">
            </div>
            <div>
                <span>数量：</span><input v-model="newAmount" type="number" min="0" step="1">
            </div>
            <div>
                <span>成本价：</span><input v-model="newCost" type="number" min="0" step="0.01">
            </div>
            <div>
                <span>售价：</span><input v-model="newSell" type="number" min="0" step="0.01">
            </div>
            <div>
                <button @click="buyGood">确定</button>
            </div>
            <h2>出售商品</h2>
            <div v-if="goodList.length && selected !== null">
                <span>{{goodList[selected]['name']}} X </span>
                <input type="number" min="0" step="1" width="20px" placeholder="请输入数量" v-model="toSell">
                <span>个</span>
            </div>
            <div v-else>
                选择出售的商品
            </div>
            <div v-if="goodList.length && selected !==null">
                <button @click="sellGood">确定</button>
            </div>
        </div>
        <ul class="good-list">
            <h2>仓库列表</h2>
                <transition-group name="list-complete" tag="p">
                    <li :class="{ selected: index === selected }" class="list-complete-item" v-for="(good, index) in goodList" :key="good.id" @click="chooseGood(index)">
                        {{good.name}} 成本:{{good.cost}},售价:{{good.sell}},共{{good.amount}}个
                    </li>
                </transition-group>
                <div v-if="goodList.length == 0">仓库中没有商品</div>
        </ul>
    </div>
</template>

<script>

export default {
    data () {
        return {
            id: 1,
            totalCost: 0,
            totalSell: 0,
            totalGet: 0,
            newName: '苹果',
            newAmount: 10,
            newCost: 5,
            newSell: 7,
            goodList: [
            ],
            selected: null,
            toSell: 0,
            sellList: [
                {
                    id: 0,
                    name: '苹果',
                    benifit: 0
                }
            ]
        }
    },
    components: {
    },
    mounted () {
    },
    watch: {
        goodList: function () {}
    },
    methods: {
        chooseGood (index) {
            this.selected = index
            
        },
        buyGood () {
            this.goodList.push({
                id: this.id++,
                name: this.newName,
                cost: this.newCost,
                sell: this.newSell,
                amount: this.newAmount
            })
            console.log(this.goodList);
            this.getTotalSell()
            this.getTotalCost()
        },
        sellGood () {
            let good = this.goodList[this.selected]
            console.log(this.toSell);
            console.log(good.amount);
            
            
            if (this.toSell == good.amount) {
                this.goodList.splice(this.selected, 1)
                if (this.selected == this.goodList.length) {
                    this.selected--
                }
                if (this.selected < 0) {
                    this.selected = null
                }
                this.totalGet += this.toSell * (good.sell - good.cost)
                this.getTotalSell()
                this.getTotalCost()
                return
            }
            if (this.toSell < good.amount) {
                good.amount -= this.toSell
                this.totalGet += this.toSell * (good.sell - good.cost)
                this.getTotalSell()
                this.getTotalCost()
            } else {
                alert('数量超出最大限制')
            }
        },
        getTotalSell () {
            let t = 0
            this.goodList.forEach(element => {
                t += element.sell * element.amount
            })
            this.totalSell = t
        },
        getTotalCost () {
            let t = 0
            this.goodList.forEach(element => {
                t += element.cost * element.amount
            })
            this.totalCost = t
        }
    }
}
</script>

<style>
ul {
    list-style: none;
}
.count {
    border: #ff5656 solid 1px;
    padding: 60px;
    border-radius: 5px;
}
.main {
    border: #ff5656 solid 1px;
    padding: 20px;
    border-radius: 5px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
}
input[type="text"] {
    border: 0;
    border-bottom: #ff5656 solid 1px;
}
input[type="number"] {
    border: 0;
    border-bottom: #ff5656 solid 1px;
}
button {
    outline: none;
    border: #ff5656 solid 1px;
    border-radius: 4px;
}
button:active {
    border: #ff5656 solid 1px;
    border-radius: 4px;
}
.get-good {
    border: #ff5656 solid 1px;
    padding: 20px;
    border-radius: 5px;
    display: flex;
    flex-flow: column nowrap;
    text-align: right;
}
.selected {
    background: #ff5656;
    color: white;
    border-radius: 5px;
}
.good-list {
    border: #ff5656 solid 1px;
    padding: 20px;
    border-radius: 5px;
}.list-complete-item {
  transition: all 0.6s;
}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(30px);
}
.list-complete-leave-active {
  position: absolute;
}
</style>
