const Generator = require('yeoman-generator')

const rows = []
module.exports = class extends Generator {
    rows () {
        return this.prompt([
            {
                type: 'confirm',
                name: 'add',
                message: 'Do you want to add a row?',
                default: true
            }
        ]).then(answer => {
            const { add } = answer

            if (add) {
                rows.push({
                    type: 'Row',
                    children: []
                })

                this._addColumn()
            } else {
                this._done()
            }
        })
    }

    _columns () {
        const done = this.async()

        return this.prompt([
            {
                type: 'input',
                name: 'size',
                message: 'what size should this column be?'
            }
        ]).then(answer => {
            const { size } = answer

            rows[rows.length - 1].children.push({
                type: 'Column',
                size: size
            })
            return this._addColumn()
        })
    }

    _addColumn () {
        return this.prompt([
            {
                type: 'confirm',
                name: 'add',
                message: 'Do you want to add a column?',
                default: true
            }
        ]).then(answer => {
            const { add } = answer

            if (add)
                this._columns()
            else
                this.rows()
        })
    }

    _done () {
        console.log(`[`)
        rows.forEach((row, i) => {
            const icomma = i === rows.length - 1
                ? ''
                : ','
            console.log(`    {`)
            console.log(`        type: '${row.type}',`)
            console.log(`        children: [`)
            row.children.forEach((col, j) => {
                const jcomma = j === row.children.length - 1
                    ? ''
                    : ','
                console.log(`            {`)
                console.log(`                type: '${col.type}',`)
                console.log(`                size: ${col.size}`)
                console.log(`            }${jcomma}`)
            })
            console.log(`        ]`)
            console.log(`    }${icomma}`)
        })
        console.log(`]`)
    }
}