/**
 * Core
 *
 * Holds core utilities.
 *
 * @author Pedro Jesus <pedrotiagojesus1995@gmail.com>
 * @since 10-02-2023 First time this was introduced.
 */
class Core {

    /**
     * Instanciates a new core class.
     *
     * @returns {void}
     * @author Pedro Jesus <pedrotiagojesus1995@gmail.com>
     */
    constructor() {

    }

    /**
     * Log
     *
     * Produces a log entry.
     *
     * E.g.,
     * ```
     * '[HH:MM:SS] [ClassName] ...'
     * ```
     *
     * @param  {...any} args
     * @returns {Core} This class instance.
     * @author Pedro Jesus <pedrotiagojesus1995@gmail.com>
     */
    log(...args) {

        console.log(
            `[${/\d\d\:\d\d\:\d\d/.exec(new Date())[0]}]`,
            `[${this.constructor.name}]`,
            ...args
        );

        return this;
    }

    /**
     * Log Info
     *
     * Produces an information log entry.
     *
     * E.g.,
     * ```
     * '[HH:MM:SS] [ClassName] ...'
     * ```
     *
     * @param  {...any} args
     * @returns {Core} This class instance.
     * @author Pedro Jesus <pedrotiagojesus1995@gmail.com>
     */
    logInfo(...args) {

        console.info(
            `[${/\d\d\:\d\d\:\d\d/.exec(new Date())[0]}]`,
            `[${this.constructor.name}]`,
            ...args
        );

        return this;
    }

    /**
     * Log Error
     *
     * Produces an error log entry.
     *
     * E.g.,
     * ```
     * '[HH:MM:SS] [ClassName] ...'
     * ```
     *
     * @param  {...any} args
     * @returns {Core} This class instance.
     * @author Pedro Jesus <pedrotiagojesus1995@gmail.com>
     */
    logErr(...args) {

        console.error(
            `[${/\d\d\:\d\d\:\d\d/.exec(new Date())[0]}]`,
            `[${this.constructor.name}]`,
            ...args
        );

        return this;
    }
}

export { Core };