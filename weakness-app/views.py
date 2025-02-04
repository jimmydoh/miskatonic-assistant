"""Module providing the Flask Routes for weakness-app"""

import json
import os
from datetime import datetime
from flask import Flask
from flask import render_template
from . import app


investigators = [
    {"id": 1, "name": "One"},
    {"id": 2, "name": "Two"},
    {"id": 3, "name": "Three"},
    {"id": 4, "name": "Four"},
]

cdn_root = os.getenv("CDN_ROOT", default="http://localhost:5000")


@app.route("/")
def index():
    """Route - Primary SPA index"""
    return render_template("index.html", investigators=investigators, cdn_root=cdn_root)


@app.route("/api/basicweaknesses")
def basicweaknesses():
    """Route - dynamic basicweaknesses.json from all cards"""
    site_root = os.path.realpath(os.path.dirname(__file__))
    json_url = os.path.join(site_root, "static/data", "allcards.json")
    return list(
        filter(
            lambda x: ((x.get("subtype_code",None) == "basicweakness") and (x.get("pack_code",None) != "rcore") and (x.get("code",None) != "01000")),
            json.load(open(json_url, encoding="utf8"))
        )
    )


@app.route("/<path:path>")
def catch_all(path):
    """Route - Primary SPA index"""
    return render_template("index.html", investigators=investigators, cdn_root=cdn_root)
