export const dispatchCartUpdatedEvent = () => {
    window.dispatchEvent(new Event("cartUpdated"));
};