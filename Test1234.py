yield f"data: {json.dumps({\n"
                        'type': 'status_update',\n'
                        'data': current_status,\n'
                        'timestamp': time.time()\n'
                    '})}\n\n"
