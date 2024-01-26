class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    append(data) {
        const newNode = new Node(data);

        if (!this.head) {
            this.head = newNode;
            return;
        }

        let current = this.head;
        while (current.next) {
            current = current.next;
        }

        current.next = newNode;
    }

    display() {
        let current = this.head;
        while (current) {
            console.log(current.data);
            current = current.next;
        }
    }

    // Method to insert a new node at a specific position in the linked list
    insertAt(position, data) {
        if (position === 0) {
            this.append(data);
            return;
        }

        const newNode = new Node(data);
        let current = this.head;
        let count = 0;

        while (current && count < position - 1) {
            current = current.next;
            count++;
        }

        if (!current) {
            console.error('Position out of bounds');
            return;
        }

        newNode.next = current.next;
        current.next = newNode;
    }
}

class Position {
    constructor (id, name, salary) {
        this.id = id;
        this.name = name;
        this.salary = salary;
    }

    equalById(otherId) {
        return this.id == otherId;
    }
}

class Employee {
    constructor (id, firstName, lastName, positionId) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.poisitonId = positionId; 
    }
}

class EmployeeProvider {
    constructor(positions) {
        if (!positions) {
            throw new Error("Arguments must be initialized as array and filled!");
        }

        this.positions = positions;
        this.employee = new LinkedList();
    }

    addEmployee(id, firstName, lastName, positionId) {
        if (!id || !firstName || !lastName || !positionId) {
            throw new Error("Arguments must be initialized as array and filled!");
        }
        
        if (this.employeeExists(id)) {
            throw new Error("Specified employee id already exist!");
        }

        if (!this.positionExists(positionId)) {
            throw new Error("Specified position id doesnt't exist!");
        }

        this.employee.append(new Employee(id, firstName, lastName, positionId));
    }

    display() {
        let currentEmployee = this.employee.head;
        while (currentEmployee) {
            console.log("Id: " + currentEmployee.data.id 
                + "\t" + currentEmployee.data.firstName 
                + "\t" + currentEmployee.data.lastName
                + "\t" + this.findPositionName(currentEmployee.data.positionId));

            currentEmployee = currentEmployee.next;
        }
    }

    findPositionName(positionId) {
        let currentPosition = this.positions.head;
        while (currentPosition) {
            if (currentPosition.data.id == positionId) {
                return currentPosition.data.name;
            }
            currentPosition = currentPosition.next;
        }
    }

    positionExists(otherId) {
        let result = false;
        
        let current = this.positions.head; 
        while (current) {
            if (current.data.id == otherId) {
                result = true;
                break;
            }
            current = current.next;
        }

        return result;
    }

    employeeExists(otherId) {
        let result = false;
        let current = this.employee.head;

        if (!current) {
            return result;
        }

        while (current) {
            if (current.data.id == otherId) {
                result = true;
                break;
            }
            current = current.next;
        }

        return result;
    }
}

// Main

    // Data mock
    let positionList = new LinkedList();

    positionList.append(new Position(1, 'Junior', '300$'));
    positionList.append(new Position(2, 'Middle?', '450$'));
    
    // Act
    let provider = new EmployeeProvider(positionList);

    provider.addEmployee(1, 'Alesha', 'Ivanov', 1);
    provider.addEmployee(2, 'George', 'Johanon', 1);
    provider.addEmployee(3, 'X', 'Mask', 2);
    
    provider.display();