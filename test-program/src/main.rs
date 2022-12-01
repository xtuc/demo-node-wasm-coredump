struct MyThing {
    value: usize,
}

fn main() {
    let thing = MyThing { value: 3 };
    process_thing(&thing)
}

fn process_thing(thing: &MyThing) {
    let result = calculate(thing.value);
    println!("result is {}", result);
}

fn calculate(value: usize) -> usize {
    value - 10
}
