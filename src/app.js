const DATA_JSON_URL = 'src/assets/data.json'

class ElementCreator {
    constructor(type, containerFather) {
        this.container = document.querySelector(containerFather)
        this.type = type
    }

    createElement(id) {
        const element = document.createElement(this.type)
        element.id = id
        return element
    }

    addToContainer(idList) {
        idList.forEach(id => {
            const element = this.createElement(id)
            this.container.appendChild(element)
        })
    }
}

class Renderer {
    static clearDisplay(elements) {
        elements.forEach(element => {
            const container = document.querySelector(element)
            container.innerHTML = ''
        })
    }

    static renderButtons(data) {
        const keys = Object.keys(data)
        const buttonContainer = document.querySelector('#buttons-course')

        keys.forEach(key => {
            const button = this.createButton(key, () => this.renderNames(data[key]))
            buttonContainer.appendChild(button)
        })
    }

    static renderNames(courses) {
        this.clearDisplay(['#courses', '#week', '#schedule', '#info'])
        const container = document.querySelector('#courses')

        courses.sort((x, y) => x.name_course.localeCompare(y.name_course))

        courses.forEach(course => {
            const button = this.createButton(course.name_course, () => this.renderWeek(course.week_day))
            container.appendChild(button)
        })
    }

    static renderWeek(week) {
        this.clearDisplay(['#courses', '#week', '#schedule', '#info'])

        const keys = Object.keys(week)
        const container = document.querySelector('#week')

        keys.forEach(key => {
            const button = this.createButton(key, () => this.renderSchedule(week[key]))
            container.appendChild(button)
        })
    }

    static renderSchedule(schedule) {
        this.clearDisplay(['#courses', '#week', '#schedule', '#info'])

        const keys = Object.keys(schedule)
        const container = document.querySelector('#schedule')

        keys.forEach(key => {
            const button = this.createButton(key, () => this.renderInfo(schedule[key]))
            container.appendChild(button)
        })
    }

    static renderInfo(info) {
        this.clearDisplay(['#courses', '#week', '#schedule', '#info'])

        const keys = Object.keys(info)
        const container = document.querySelector('#info')

        keys.forEach(key => {
            const heading = document.createElement('h3')
            heading.textContent = key

            const paragraph = document.createElement('p')
            paragraph.textContent = info[key]

            container.appendChild(heading)
            container.appendChild(paragraph)
        })
    }

    static createButton(text, clickHandler) {
        const button = document.createElement('button')
        button.textContent = text
        button.addEventListener('click', clickHandler)
        return button
    }
}

fetch(DATA_JSON_URL)
    .then(response => {
        if (!response.ok) {
            throw new Error('Error loading JSON file')
        }
        return response.json()
    })

    .then(data => {
        console.log(data)

        const elementCreator = new ElementCreator('div', 'main')
        elementCreator.addToContainer(['buttons-course', 'courses', 'week', 'schedule', 'info'])

        Renderer.renderButtons(data)
        document.querySelector('#buttons-course > button:nth-child(1)').click()
    })

    .catch(error => {
        console.error('Error:', error)
    })