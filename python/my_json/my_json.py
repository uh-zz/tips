import json


def read_json_file(file_path: str) -> dict:
    """jsonファイルを読み込む"""
    with open(file_path, "r") as f:
        last_option: dict = json.load(f)
    return last_option


def write_json_to_file(dict_data: dict,
                       file_path: str,
                       indent: int = 4) -> None:
    """jsonファイルに書き込む"""
    with open(file_path, "w") as f:
        json.dump(obj=dict_data, fp=f, indent=indent)
