"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.beveiligdEndpoint = void 0;
const beveiligdEndpoint = (req, res) => {
    res.status(200).json({ message: 'Toegang verleend tot beveiligd endpoint!' });
};
exports.beveiligdEndpoint = beveiligdEndpoint;
