extern crate enigo;
use enigo::*;
use std::env::args;

fn main() {
    let mut enigo = Enigo::new();
    let message = args().nth(1).unwrap();
    // write text
    enigo.key_sequence(message.as_str());
}
