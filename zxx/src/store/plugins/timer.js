export default function timer() {
    return store => {
        setInterval(() => {
            store.commit("timer", new Date().getTime());
        }, 1000);
    }
}
