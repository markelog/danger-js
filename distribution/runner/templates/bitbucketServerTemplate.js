"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Converts a set of violations into a Markdown section
 *
 * @param {string} name User facing title of section
 * @param {string} emoji Emoji name to show
 * @param {Violation[]} violations for section
 * @returns {string} Markdown
 */
function resultsSection(name, emoji, violations) {
    if (violations.length === 0 || violations.every(function (violation) { return !violation.message; })) {
        return "";
    }
    return ("\n" +
        ("| " + emoji + " | " + name + "\n") +
        "| --- | --- |\n" +
        "\n" +
        violations
            .map(function (v) {
            return ("> " +
                v.message
                    .replace(/<\/?code>/g, "`")
                    .split("\n")
                    .join("\n> "));
        })
            .join("\n\n") +
        "\n");
}
exports.dangerIDToString = function (id) { return "danger-id-" + id + ";"; };
exports.fileLineToString = function (file, line) { return "  File: " + file + ";\n  Line: " + line + ";"; };
/**
 * Postfix signature to be attached comment generated / updated by danger.
 */
exports.dangerSignaturePostfix = "\n|    |\n|---:|\n| _Generated by \uD83D\uDEAB [dangerJS](http://github.com/danger/danger-js/)_ |\n";
/**
 * A template function for creating a GitHub issue comment from Danger Results
 * @param {string} dangerID A string that represents a unique build
 * @param {DangerResults} results Data to work with
 * @returns {string} HTML
 */
function template(dangerID, results) {
    return "\n" + resultsSection("Fails", "🚫", results.fails) + "\n" + resultsSection("Warnings", "⚠️", results.warnings) + "\n" + resultsSection("Messages", "📖", results.messages) + "\n\n" + results.markdowns.map(function (v) { return v.message; }).join("\n\n") + "\n\n" + exports.dangerSignaturePostfix + "\n\n[](http://" + exports.dangerIDToString(dangerID) + ")\n";
}
exports.template = template;
function inlineTemplate(dangerID, results, file, line) {
    var printViolation = function (emoji) { return function (violation) {
        return "- " + emoji + " " + violation.message;
    }; };
    return "\n[//]: # (" + exports.dangerIDToString(dangerID) + ")\n[//]: # (" + exports.fileLineToString(file, line) + ")\n" + results.fails.map(printViolation("🚫")).join("\n") + "\n" + results.warnings.map(printViolation("⚠️")).join("\n") + "\n" + results.messages.map(printViolation("📖")).join("\n") + "\n" + results.markdowns.map(function (v) { return v.message; }).join("\n\n") + "\n  ";
}
exports.inlineTemplate = inlineTemplate;
//# sourceMappingURL=bitbucketServerTemplate.js.map