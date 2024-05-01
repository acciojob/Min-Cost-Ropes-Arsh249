class MinHeap {
    constructor() {
        this.heap = [];
    }

    insert(value) {
        this.heap.push(value);
        this.heapifyUp();
    }

    extractMin() {
        if (this.isEmpty()) {
            return null;
        }

        const min = this.heap[0];
        const last = this.heap.pop();
        if (!this.isEmpty()) {
            this.heap[0] = last;
            this.heapifyDown();
        }
        return min;
    }

    heapifyUp() {
        let currentIndex = this.heap.length - 1;
        while (currentIndex > 0) {
            const parentIndex = Math.floor((currentIndex - 1) / 2);
            if (this.heap[currentIndex] >= this.heap[parentIndex]) {
                break;
            }
            [this.heap[currentIndex], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[currentIndex]];
            currentIndex = parentIndex;
        }
    }

    heapifyDown() {
        let currentIndex = 0;
        const lastIndex = this.heap.length - 1;
        while (true) {
            const leftChildIndex = 2 * currentIndex + 1;
            const rightChildIndex = 2 * currentIndex + 2;
            let nextIndex = null;
            if (leftChildIndex <= lastIndex) {
                nextIndex = leftChildIndex;
            }
            if (rightChildIndex <= lastIndex && this.heap[rightChildIndex] < this.heap[leftChildIndex]) {
                nextIndex = rightChildIndex;
            }
            if (nextIndex === null || this.heap[currentIndex] <= this.heap[nextIndex]) {
                break;
            }
            [this.heap[currentIndex], this.heap[nextIndex]] = [this.heap[nextIndex], this.heap[currentIndex]];
            currentIndex = nextIndex;
        }
    }

    isEmpty() {
        return this.heap.length === 0;
    }
}

function mincost(arr) {
    // Initialize a min-heap
    const minHeap = new MinHeap();
    for (const rope of arr) {
        minHeap.insert(rope);
    }
    
    // Initialize total cost
    let totalCost = 0;
    
    // Continue until there is only one rope left
    while (!minHeap.isEmpty()) {
        // Extract the two shortest ropes
        const shortest1 = minHeap.extractMin();
        const shortest2 = minHeap.extractMin();
        
        // If there is only one rope left, break
        if (shortest2 === null) {
            break;
        }
        
        // Calculate the cost of merging them
        const cost = shortest1 + shortest2;
        
        // Add the cost to the total
        totalCost += cost;
        
        // Insert the merged rope back to the heap
        minHeap.insert(cost);
    }
    
    return totalCost;
}


module.exports=mincost;
