export function authGuard(context) {
    return {
        canActivate: function() {
            return true;
        }
    };
}