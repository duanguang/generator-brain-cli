"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var downloadUrl = require('download');
var gitclone = require('git-clone');
var rm = require('rimraf').sync;
/**
 * Expose `download`.
 */
/**
 * Download `repo` to `dest` and callback `fn(err)`.
 *
 * @param {String} repo
 * @param {String} dest
 * @param {Object} opts
 * @param {Function} fn
 */
function download(repo, dest, opts, fn) {
    return __awaiter(this, void 0, void 0, function* () {
        if (typeof opts === 'function') {
            fn = opts;
            opts = null;
        }
        opts = opts || {};
        var clone = opts.clone || false;
        repo = normalize(repo);
        var url = getUrl(repo, clone);
        if (clone) {
            gitclone(url, dest, { checkout: repo.checkout, shallow: repo.checkout === 'master' }, function (err) {
                if (err === undefined) {
                    rm(dest + '/.git');
                    fn();
                }
                else {
                    fn(err);
                }
            });
        }
        else {
            yield downloadUrl(url, dest, { extract: true, strip: 1, mode: '666', headers: { accept: 'application/zip' } }).then((data) => __awaiter(this, void 0, void 0, function* () {
                yield fn();
            })).catch(err => {
                fn(err);
            });
        }
    });
}
exports.download = download;
/**
 * Normalize a repo string.
 *
 * @param {String} repo
 * @return {Object}
 */
function normalize(repo) {
    var regex = /^((github|gitlab|bitbucket):)?((.+):)?([^/]+)\/([^#]+)(#(.+))?$/;
    var match = regex.exec(repo);
    var type = match[2] || 'github';
    var origin = match[4] || null;
    var owner = match[5];
    var name = match[6];
    var checkout = match[8] || 'master';
    if (origin == null) {
        if (type === 'github')
            origin = 'github.com';
        else if (type === 'gitlab')
            origin = 'gitlab.com';
        else if (type === 'bitbucket')
            origin = 'bitbucket.org';
    }
    return {
        type: type,
        origin: origin,
        owner: owner,
        name: name,
        checkout: checkout
    };
}
/**
 * Adds protocol to url in none specified
 *
 * @param {String} url
 * @return {String}
 */
function addProtocol(origin, clone) {
    if (!/^(f|ht)tps?:\/\//i.test(origin)) {
        if (clone)
            origin = 'git@' + origin;
        else
            origin = 'https://' + origin;
    }
    return origin;
}
/**
 * Return a zip or git url for a given `repo`.
 *
 * @param {Object} repo
 * @return {String}
 */
function getUrl(repo, clone) {
    var url;
    // Get origin with protocol and add trailing slash or colon (for ssh)
    var origin = addProtocol(repo.origin, clone);
    if (/^git\@/i.test(origin))
        origin = origin + ':';
    else
        origin = origin + '/';
    // Build url
    if (clone) {
        url = origin + repo.owner + '/' + repo.name + '.git';
    }
    else {
        if (repo.type === 'github')
            url = origin + repo.owner + '/' + repo.name + '/archive/' + repo.checkout + '.zip';
        else if (repo.type === 'gitlab')
            url = origin + repo.owner + '/' + repo.name + '/repository/archive.zip?ref=' + repo.checkout;
        else if (repo.type === 'bitbucket')
            url = origin + repo.owner + '/' + repo.name + '/get/' + repo.checkout + '.zip';
        else
            ;
        // url = github(repo)
    }
    return url;
}
