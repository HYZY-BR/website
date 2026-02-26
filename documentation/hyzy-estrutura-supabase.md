| table_schema | table_name               | column_name            | data_type                | is_nullable | constraint_type | referenced_schema | referenced_table      | referenced_column |
| ------------ | ------------------------ | ---------------------- | ------------------------ | ----------- | --------------- | ----------------- | --------------------- | ----------------- |
| audit        | audit_logs               | id                     | uuid                     | NO          | PRIMARY KEY     | null              | null                  | null              |
| audit        | audit_logs               | table_schema           | text                     | NO          | null            | null              | null                  | null              |
| audit        | audit_logs               | table_name             | text                     | NO          | null            | null              | null                  | null              |
| audit        | audit_logs               | record_id              | uuid                     | YES         | null            | null              | null                  | null              |
| audit        | audit_logs               | record_id_text         | text                     | YES         | null            | null              | null                  | null              |
| audit        | audit_logs               | action                 | text                     | NO          | null            | null              | null                  | null              |
| audit        | audit_logs               | old_data               | jsonb                    | YES         | null            | null              | null                  | null              |
| audit        | audit_logs               | new_data               | jsonb                    | YES         | null            | null              | null                  | null              |
| audit        | audit_logs               | changed_by             | uuid                     | YES         | FOREIGN KEY     | null              | null                  | null              |
| audit        | audit_logs               | changed_at             | timestamp with time zone | NO          | null            | null              | null                  | null              |
| audit        | audit_logs               | metadata               | jsonb                    | YES         | null            | null              | null                  | null              |
| audit        | audit_logs               | client_addr            | inet                     | YES         | null            | null              | null                  | null              |
| audit        | policies_catalog         | id                     | uuid                     | NO          | PRIMARY KEY     | null              | null                  | null              |
| audit        | policies_catalog         | schema_name            | text                     | NO          | UNIQUE          | null              | null                  | null              |
| audit        | policies_catalog         | table_name             | text                     | NO          | UNIQUE          | null              | null                  | null              |
| audit        | policies_catalog         | policy_name            | text                     | NO          | UNIQUE          | null              | null                  | null              |
| audit        | policies_catalog         | roles                  | ARRAY                    | YES         | null            | null              | null                  | null              |
| audit        | policies_catalog         | cmd                    | text                     | YES         | null            | null              | null                  | null              |
| audit        | policies_catalog         | definition_using       | text                     | YES         | null            | null              | null                  | null              |
| audit        | policies_catalog         | definition_check       | text                     | YES         | null            | null              | null                  | null              |
| audit        | policies_catalog         | is_active              | boolean                  | YES         | null            | null              | null                  | null              |
| audit        | policies_catalog         | created_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| audit        | policies_catalog         | updated_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| audit        | policies_catalog         | deleted_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| audit        | routine_catalog          | id                     | uuid                     | NO          | PRIMARY KEY     | null              | null                  | null              |
| audit        | routine_catalog          | object_type            | text                     | NO          | UNIQUE          | null              | null                  | null              |
| audit        | routine_catalog          | schema_name            | text                     | NO          | UNIQUE          | null              | null                  | null              |
| audit        | routine_catalog          | object_name            | text                     | NO          | UNIQUE          | null              | null                  | null              |
| audit        | routine_catalog          | identity_args          | text                     | NO          | UNIQUE          | null              | null                  | null              |
| audit        | routine_catalog          | friendly_name          | text                     | YES         | null            | null              | null                  | null              |
| audit        | routine_catalog          | description            | text                     | YES         | null            | null              | null                  | null              |
| audit        | routine_catalog          | definition             | text                     | YES         | null            | null              | null                  | null              |
| audit        | routine_catalog          | is_active              | boolean                  | YES         | null            | null              | null                  | null              |
| audit        | routine_catalog          | is_system_object       | boolean                  | YES         | null            | null              | null                  | null              |
| audit        | routine_catalog          | created_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| audit        | routine_catalog          | updated_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| audit        | routine_catalog          | deleted_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| cron         | job                      | jobid                  | bigint                   | NO          | null            | null              | null                  | null              |
| cron         | job                      | schedule               | text                     | NO          | null            | null              | null                  | null              |
| cron         | job                      | command                | text                     | NO          | null            | null              | null                  | null              |
| cron         | job                      | nodename               | text                     | NO          | null            | null              | null                  | null              |
| cron         | job                      | nodeport               | integer                  | NO          | null            | null              | null                  | null              |
| cron         | job                      | database               | text                     | NO          | null            | null              | null                  | null              |
| cron         | job                      | username               | text                     | NO          | null            | null              | null                  | null              |
| cron         | job                      | active                 | boolean                  | NO          | null            | null              | null                  | null              |
| cron         | job                      | jobname                | text                     | YES         | null            | null              | null                  | null              |
| cron         | job_run_details          | jobid                  | bigint                   | YES         | null            | null              | null                  | null              |
| cron         | job_run_details          | runid                  | bigint                   | NO          | PRIMARY KEY     | null              | null                  | null              |
| cron         | job_run_details          | job_pid                | integer                  | YES         | null            | null              | null                  | null              |
| cron         | job_run_details          | database               | text                     | YES         | null            | null              | null                  | null              |
| cron         | job_run_details          | username               | text                     | YES         | null            | null              | null                  | null              |
| cron         | job_run_details          | command                | text                     | YES         | null            | null              | null                  | null              |
| cron         | job_run_details          | status                 | text                     | YES         | null            | null              | null                  | null              |
| cron         | job_run_details          | return_message         | text                     | YES         | null            | null              | null                  | null              |
| cron         | job_run_details          | start_time             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| cron         | job_run_details          | end_time               | timestamp with time zone | YES         | null            | null              | null                  | null              |
| fintech      | customers                | id                     | uuid                     | NO          | PRIMARY KEY     | null              | null                  | null              |
| fintech      | customers                | workspace_id           | uuid                     | YES         | UNIQUE          | null              | null                  | null              |
| fintech      | customers                | workspace_id           | uuid                     | YES         | FOREIGN KEY     | public            | workspaces            | id                |
| fintech      | customers                | gateway_id             | uuid                     | YES         | FOREIGN KEY     | fintech           | gateways              | id                |
| fintech      | customers                | gateway_id             | uuid                     | YES         | UNIQUE          | null              | null                  | null              |
| fintech      | customers                | external_id            | text                     | NO          | null            | null              | null                  | null              |
| fintech      | customers                | created_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| fintech      | customers                | deleted_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| fintech      | gateways                 | id                     | uuid                     | NO          | PRIMARY KEY     | null              | null                  | null              |
| fintech      | gateways                 | slug                   | text                     | NO          | UNIQUE          | null              | null                  | null              |
| fintech      | gateways                 | name                   | text                     | NO          | null            | null              | null                  | null              |
| fintech      | gateways                 | is_active              | boolean                  | YES         | null            | null              | null                  | null              |
| fintech      | gateways                 | config                 | jsonb                    | YES         | null            | null              | null                  | null              |
| fintech      | gateways                 | created_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| fintech      | gateways                 | deleted_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| fintech      | transactions             | id                     | uuid                     | NO          | PRIMARY KEY     | null              | null                  | null              |
| fintech      | transactions             | workspace_id           | uuid                     | YES         | FOREIGN KEY     | public            | workspaces            | id                |
| fintech      | transactions             | gateway_id             | uuid                     | YES         | FOREIGN KEY     | fintech           | gateways              | id                |
| fintech      | transactions             | amount                 | numeric                  | NO          | null            | null              | null                  | null              |
| fintech      | transactions             | currency               | text                     | YES         | null            | null              | null                  | null              |
| fintech      | transactions             | status                 | text                     | NO          | null            | null              | null                  | null              |
| fintech      | transactions             | external_id            | text                     | YES         | UNIQUE          | null              | null                  | null              |
| fintech      | transactions             | payment_method         | text                     | YES         | null            | null              | null                  | null              |
| fintech      | transactions             | split_rules            | jsonb                    | YES         | null            | null              | null                  | null              |
| fintech      | transactions             | metadata               | jsonb                    | YES         | null            | null              | null                  | null              |
| fintech      | transactions             | created_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| fintech      | transactions             | updated_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| fintech      | transactions             | deleted_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | accesses                 | id                     | uuid                     | NO          | PRIMARY KEY     | null              | null                  | null              |
| public       | accesses                 | team_id                | uuid                     | NO          | FOREIGN KEY     | public            | teams                 | id                |
| public       | accesses                 | name                   | text                     | NO          | null            | null              | null                  | null              |
| public       | accesses                 | credentials            | jsonb                    | YES         | null            | null              | null                  | null              |
| public       | accesses                 | is_active              | boolean                  | YES         | null            | null              | null                  | null              |
| public       | accesses                 | last_checked_at        | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | accesses                 | created_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | accesses                 | updated_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | accesses                 | category_id            | uuid                     | YES         | FOREIGN KEY     | public            | accesses_categories   | id                |
| public       | accesses                 | deleted_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | accesses                 | workspace_id           | uuid                     | NO          | FOREIGN KEY     | public            | workspaces            | id                |
| public       | accesses_categories      | id                     | uuid                     | NO          | PRIMARY KEY     | null              | null                  | null              |
| public       | accesses_categories      | label                  | text                     | NO          | null            | null              | null                  | null              |
| public       | accesses_categories      | value                  | text                     | NO          | null            | null              | null                  | null              |
| public       | accesses_categories      | icon                   | text                     | YES         | null            | null              | null                  | null              |
| public       | accesses_categories      | created_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | accesses_categories      | deleted_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | accesses_categories      | type                   | USER-DEFINED             | NO          | null            | null              | null                  | null              |
| public       | client_api_triggers      | id                     | uuid                     | NO          | PRIMARY KEY     | null              | null                  | null              |
| public       | client_api_triggers      | endpoint_url           | text                     | NO          | null            | null              | null                  | null              |
| public       | client_api_triggers      | is_active              | boolean                  | YES         | null            | null              | null                  | null              |
| public       | client_api_triggers      | last_triggered_at      | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | client_api_triggers      | last_status_code       | integer                  | YES         | null            | null              | null                  | null              |
| public       | client_api_triggers      | last_response          | text                     | YES         | null            | null              | null                  | null              |
| public       | client_api_triggers      | retry_count            | integer                  | YES         | null            | null              | null                  | null              |
| public       | client_api_triggers      | max_retries            | integer                  | YES         | null            | null              | null                  | null              |
| public       | client_api_triggers      | next_retry_at          | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | client_api_triggers      | created_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | client_api_triggers      | updated_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | client_api_triggers      | team_id                | uuid                     | NO          | FOREIGN KEY     | public            | teams                 | id                |
| public       | client_api_triggers      | deleted_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | client_api_triggers      | workspace_id           | uuid                     | NO          | FOREIGN KEY     | public            | workspaces            | id                |
| public       | companies                | id                     | uuid                     | NO          | PRIMARY KEY     | null              | null                  | null              |
| public       | companies                | name                   | text                     | NO          | null            | null              | null                  | null              |
| public       | companies                | tax_id                 | text                     | YES         | null            | null              | null                  | null              |
| public       | companies                | address                | text                     | YES         | null            | null              | null                  | null              |
| public       | companies                | contact_email          | text                     | YES         | null            | null              | null                  | null              |
| public       | companies                | created_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | companies                | updated_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | companies                | deleted_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | companies                | owner_id               | uuid                     | YES         | FOREIGN KEY     | public            | profiles              | id                |
| public       | credit_ledger            | id                     | uuid                     | NO          | PRIMARY KEY     | null              | null                  | null              |
| public       | credit_ledger            | amount                 | integer                  | NO          | null            | null              | null                  | null              |
| public       | credit_ledger            | valid_until            | date                     | NO          | null            | null              | null                  | null              |
| public       | credit_ledger            | created_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | credit_ledger            | deleted_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | credit_ledger            | workspace_id           | uuid                     | NO          | FOREIGN KEY     | public            | workspaces            | id                |
| public       | credit_ledger            | resource_type          | USER-DEFINED             | NO          | null            | null              | null                  | null              |
| public       | credit_ledger            | origin_type            | text                     | YES         | null            | null              | null                  | null              |
| public       | credit_ledger            | description            | text                     | YES         | null            | null              | null                  | null              |
| public       | credit_ledger            | status                 | USER-DEFINED             | NO          | null            | null              | null                  | null              |
| public       | credit_ledger            | metadata               | jsonb                    | YES         | null            | null              | null                  | null              |
| public       | hyzy_blog_categories     | id                     | uuid                     | NO          | PRIMARY KEY     | null              | null                  | null              |
| public       | hyzy_blog_categories     | name                   | text                     | NO          | null            | null              | null                  | null              |
| public       | hyzy_blog_categories     | slug                   | text                     | NO          | UNIQUE          | null              | null                  | null              |
| public       | hyzy_blog_categories     | description            | text                     | YES         | null            | null              | null                  | null              |
| public       | hyzy_blog_categories     | created_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | hyzy_blog_categories     | updated_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | hyzy_blog_categories     | deleted_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | hyzy_blog_posts          | id                     | uuid                     | NO          | PRIMARY KEY     | null              | null                  | null              |
| public       | hyzy_blog_posts          | author_id              | uuid                     | YES         | FOREIGN KEY     | public            | profiles              | id                |
| public       | hyzy_blog_posts          | category_id            | uuid                     | YES         | FOREIGN KEY     | public            | hyzy_blog_categories  | id                |
| public       | hyzy_blog_posts          | title                  | text                     | NO          | null            | null              | null                  | null              |
| public       | hyzy_blog_posts          | slug                   | text                     | NO          | UNIQUE          | null              | null                  | null              |
| public       | hyzy_blog_posts          | content                | text                     | NO          | null            | null              | null                  | null              |
| public       | hyzy_blog_posts          | excerpt                | text                     | YES         | null            | null              | null                  | null              |
| public       | hyzy_blog_posts          | featured_image_url     | text                     | YES         | null            | null              | null                  | null              |
| public       | hyzy_blog_posts          | status                 | blog_post_status         | YES         | null            | null              | null                  | null              |
| public       | hyzy_blog_posts          | published_at           | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | hyzy_blog_posts          | created_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | hyzy_blog_posts          | updated_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | hyzy_blog_posts          | deleted_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | hyzy_contact_requests    | id                     | uuid                     | NO          | PRIMARY KEY     | null              | null                  | null              |
| public       | hyzy_contact_requests    | full_name              | text                     | NO          | null            | null              | null                  | null              |
| public       | hyzy_contact_requests    | email                  | text                     | NO          | null            | null              | null                  | null              |
| public       | hyzy_contact_requests    | phone                  | text                     | YES         | null            | null              | null                  | null              |
| public       | hyzy_contact_requests    | subject                | text                     | YES         | null            | null              | null                  | null              |
| public       | hyzy_contact_requests    | message                | text                     | NO          | null            | null              | null                  | null              |
| public       | hyzy_contact_requests    | status                 | contact_status           | YES         | null            | null              | null                  | null              |
| public       | hyzy_contact_requests    | metadata               | jsonb                    | YES         | null            | null              | null                  | null              |
| public       | hyzy_contact_requests    | created_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | hyzy_contact_requests    | deleted_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | hyzy_job_applications    | id                     | uuid                     | NO          | PRIMARY KEY     | null              | null                  | null              |
| public       | hyzy_job_applications    | full_name              | text                     | NO          | null            | null              | null                  | null              |
| public       | hyzy_job_applications    | email                  | text                     | NO          | null            | null              | null                  | null              |
| public       | hyzy_job_applications    | phone                  | text                     | YES         | null            | null              | null                  | null              |
| public       | hyzy_job_applications    | position               | text                     | NO          | null            | null              | null                  | null              |
| public       | hyzy_job_applications    | resume_url             | text                     | NO          | null            | null              | null                  | null              |
| public       | hyzy_job_applications    | linkedin_url           | text                     | YES         | null            | null              | null                  | null              |
| public       | hyzy_job_applications    | cover_letter           | text                     | YES         | null            | null              | null                  | null              |
| public       | hyzy_job_applications    | status                 | job_application_status   | YES         | null            | null              | null                  | null              |
| public       | hyzy_job_applications    | metadata               | jsonb                    | YES         | null            | null              | null                  | null              |
| public       | hyzy_job_applications    | created_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | hyzy_job_applications    | deleted_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | hyzy_newsletter_subscriptions | id                     | uuid                     | NO          | PRIMARY KEY     | null              | null                  | null              |
| public       | hyzy_newsletter_subscriptions | email                  | text                     | NO          | UNIQUE          | null              | null                  | null              |
| public       | hyzy_newsletter_subscriptions | status                 | newsletter_status       | YES         | null            | null              | null                  | null              |
| public       | hyzy_newsletter_subscriptions | metadata               | jsonb                    | YES         | null            | null              | null                  | null              |
| public       | hyzy_newsletter_subscriptions | created_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | hyzy_newsletter_subscriptions | updated_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | hyzy_newsletter_subscriptions | deleted_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | integration_providers    | id                     | uuid                     | NO          | PRIMARY KEY     | null              | null                  | null              |
| public       | integration_providers    | slug                   | text                     | NO          | null            | null              | null                  | null              |
| public       | integration_providers    | name                   | text                     | NO          | null            | null              | null                  | null              |
| public       | integration_providers    | description            | text                     | YES         | null            | null              | null                  | null              |
| public       | integration_providers    | category               | USER-DEFINED             | NO          | null            | null              | null                  | null              |
| public       | integration_providers    | icon_key               | text                     | YES         | null            | null              | null                  | null              |
| public       | integration_providers    | docs_url               | text                     | YES         | null            | null              | null                  | null              |
| public       | integration_providers    | is_active              | boolean                  | YES         | null            | null              | null                  | null              |
| public       | integration_providers    | created_at             | timestamp with time zone | NO          | null            | null              | null                  | null              |
| public       | integration_providers    | deleted_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | invoice_items            | id                     | uuid                     | NO          | PRIMARY KEY     | null              | null                  | null              |
| public       | invoice_items            | invoice_id             | uuid                     | NO          | FOREIGN KEY     | public            | invoices              | id                |
| public       | invoice_items            | description            | text                     | NO          | null            | null              | null                  | null              |
| public       | invoice_items            | amount                 | double precision         | NO          | null            | null              | null                  | null              |
| public       | invoice_items            | quantity               | integer                  | YES         | null            | null              | null                  | null              |
| public       | invoice_items            | created_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | invoice_items            | deleted_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | invoices                 | id                     | uuid                     | NO          | PRIMARY KEY     | null              | null                  | null              |
| public       | invoices                 | subscription_id        | uuid                     | YES         | FOREIGN KEY     | public            | subscriptions         | id                |
| public       | invoices                 | amount                 | double precision         | NO          | null            | null              | null                  | null              |
| public       | invoices                 | status                 | USER-DEFINED             | YES         | null            | null              | null                  | null              |
| public       | invoices                 | due_date               | timestamp with time zone | NO          | null            | null              | null                  | null              |
| public       | invoices                 | paid_date              | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | invoices                 | created_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | invoices                 | type                   | USER-DEFINED             | YES         | null            | null              | null                  | null              |
| public       | invoices                 | external_reference     | text                     | YES         | null            | null              | null                  | null              |
| public       | invoices                 | invoice_url            | text                     | YES         | null            | null              | null                  | null              |
| public       | invoices                 | invoice_number         | text                     | YES         | null            | null              | null                  | null              |
| public       | invoices                 | deleted_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | invoices                 | workspace_id           | uuid                     | NO          | FOREIGN KEY     | public            | workspaces            | id                |
| public       | keep_alive               | id                     | integer                  | NO          | PRIMARY KEY     | null              | null                  | null              |
| public       | keep_alive               | created_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | member_roles             | id                     | uuid                     | NO          | PRIMARY KEY     | null              | null                  | null              |
| public       | member_roles             | name                   | text                     | NO          | null            | null              | null                  | null              |
| public       | member_roles             | slug                   | text                     | NO          | null            | null              | null                  | null              |
| public       | member_roles             | description            | text                     | YES         | null            | null              | null                  | null              |
| public       | member_roles             | created_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | member_roles             | deleted_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | notification_preferences | user_id                | uuid                     | NO          | PRIMARY KEY     | null              | null                  | null              |
| public       | notification_preferences | user_id                | uuid                     | NO          | FOREIGN KEY     | public            | profiles              | id                |
| public       | notification_preferences | channel_email          | boolean                  | YES         | null            | null              | null                  | null              |
| public       | notification_preferences | channel_sms            | boolean                  | YES         | null            | null              | null                  | null              |
| public       | notification_preferences | channel_push           | boolean                  | YES         | null            | null              | null                  | null              |
| public       | notification_preferences | cat_security           | boolean                  | YES         | null            | null              | null                  | null              |
| public       | notification_preferences | cat_service_updates    | boolean                  | YES         | null            | null              | null                  | null              |
| public       | notification_preferences | cat_usage_alerts       | boolean                  | YES         | null            | null              | null                  | null              |
| public       | notification_preferences | cat_billing            | boolean                  | YES         | null            | null              | null                  | null              |
| public       | notification_preferences | cat_marketing          | boolean                  | YES         | null            | null              | null                  | null              |
| public       | notification_preferences | created_at             | timestamp with time zone | NO          | null            | null              | null                  | null              |
| public       | notification_preferences | updated_at             | timestamp with time zone | NO          | null            | null              | null                  | null              |
| public       | notification_preferences | deleted_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | notifications            | id                     | uuid                     | NO          | PRIMARY KEY     | null              | null                  | null              |
| public       | notifications            | user_id                | uuid                     | YES         | FOREIGN KEY     | public            | profiles              | id                |
| public       | notifications            | title                  | text                     | NO          | null            | null              | null                  | null              |
| public       | notifications            | message                | text                     | NO          | null            | null              | null                  | null              |
| public       | notifications            | is_read                | boolean                  | YES         | null            | null              | null                  | null              |
| public       | notifications            | type                   | USER-DEFINED             | NO          | null            | null              | null                  | null              |
| public       | notifications            | created_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | notifications            | deleted_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | payment_methods          | id                     | uuid                     | NO          | PRIMARY KEY     | null              | null                  | null              |
| public       | payment_methods          | type                   | USER-DEFINED             | NO          | null            | null              | null                  | null              |
| public       | payment_methods          | is_default             | boolean                  | YES         | null            | null              | null                  | null              |
| public       | payment_methods          | last_four_digits       | text                     | YES         | null            | null              | null                  | null              |
| public       | payment_methods          | expiry_date            | text                     | YES         | null            | null              | null                  | null              |
| public       | payment_methods          | holder_name            | text                     | YES         | null            | null              | null                  | null              |
| public       | payment_methods          | created_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | payment_methods          | updated_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | payment_methods          | deleted_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | payment_methods          | workspace_id           | uuid                     | NO          | FOREIGN KEY     | public            | workspaces            | id                |
| public       | plan_categories          | id                     | uuid                     | NO          | PRIMARY KEY     | null              | null                  | null              |
| public       | plan_categories          | name                   | text                     | NO          | null            | null              | null                  | null              |
| public       | plan_categories          | slug                   | text                     | NO          | null            | null              | null                  | null              |
| public       | plan_categories          | description            | text                     | YES         | null            | null              | null                  | null              |
| public       | plan_categories          | is_active              | boolean                  | YES         | null            | null              | null                  | null              |
| public       | plan_categories          | created_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | plan_categories          | deleted_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | plan_prices              | id                     | uuid                     | NO          | PRIMARY KEY     | null              | null                  | null              |
| public       | plan_prices              | plan_id                | uuid                     | YES         | FOREIGN KEY     | public            | plans                 | id                |
| public       | plan_prices              | stripe_price_id        | text                     | YES         | null            | null              | null                  | null              |
| public       | plan_prices              | periodicity            | USER-DEFINED             | YES         | null            | null              | null                  | null              |
| public       | plan_prices              | amount                 | double precision         | YES         | null            | null              | null                  | null              |
| public       | plan_prices              | is_active              | boolean                  | YES         | null            | null              | null                  | null              |
| public       | plan_prices              | deleted_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | plans                    | id                     | uuid                     | NO          | PRIMARY KEY     | null              | null                  | null              |
| public       | plans                    | name                   | text                     | NO          | null            | null              | null                  | null              |
| public       | plans                    | description            | text                     | NO          | null            | null              | null                  | null              |
| public       | plans                    | features               | ARRAY                    | NO          | null            | null              | null                  | null              |
| public       | plans                    | disk_space             | integer                  | NO          | null            | null              | null                  | null              |
| public       | plans                    | bandwidth              | integer                  | NO          | null            | null              | null                  | null              |
| public       | plans                    | is_active              | boolean                  | YES         | null            | null              | null                  | null              |
| public       | plans                    | created_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | plans                    | updated_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | plans                    | stripe_product_id      | text                     | YES         | null            | null              | null                  | null              |
| public       | plans                    | has_rls                | boolean                  | YES         | null            | null              | null                  | null              |
| public       | plans                    | has_documentation      | boolean                  | YES         | null            | null              | null                  | null              |
| public       | plans                    | category_id            | uuid                     | YES         | FOREIGN KEY     | public            | plan_categories       | id                |
| public       | plans                    | slug                   | text                     | YES         | null            | null              | null                  | null              |
| public       | plans                    | tags                   | ARRAY                    | YES         | null            | null              | null                  | null              |
| public       | plans                    | work_units             | integer                  | NO          | null            | null              | null                  | null              |
| public       | plans                    | softwares_limit        | integer                  | NO          | null            | null              | null                  | null              |
| public       | plans                    | users_limit            | integer                  | NO          | null            | null              | null                  | null              |
| public       | plans                    | deleted_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | profile_roles_hyzy       | id                     | uuid                     | NO          | PRIMARY KEY     | null              | null                  | null              |
| public       | profile_roles_hyzy       | user_id                | uuid                     | NO          | FOREIGN KEY     | public            | profiles              | id                |
| public       | profile_roles_hyzy       | permission             | USER-DEFINED             | NO          | null            | null              | null                  | null              |
| public       | profile_roles_hyzy       | created_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | profile_roles_hyzy       | deleted_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | profiles                 | id                     | uuid                     | NO          | PRIMARY KEY     | null              | null                  | null              |
| public       | profiles                 | email                  | text                     | NO          | UNIQUE          | null              | null                  | null              |
| public       | profiles                 | token_pre_incluse      | text                     | YES         | null            | null              | null                  | null              |
| public       | profiles                 | name                   | text                     | YES         | null            | null              | null                  | null              |
| public       | profiles                 | phone                  | text                     | YES         | null            | null              | null                  | null              |
| public       | profiles                 | created_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | profiles                 | updated_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | profiles                 | is_active              | boolean                  | YES         | null            | null              | null                  | null              |
| public       | profiles                 | role                   | USER-DEFINED             | YES         | null            | null              | null                  | null              |
| public       | profiles                 | auth_uid               | uuid                     | YES         | FOREIGN KEY     | null              | null                  | null              |
| public       | profiles                 | avatar_url             | text                     | YES         | null            | null              | null                  | null              |
| public       | profiles                 | deleted_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | software_config          | id                     | uuid                     | NO          | PRIMARY KEY     | null              | null                  | null              |
| public       | software_config          | software_id            | uuid                     | NO          | FOREIGN KEY     | public            | softwares             | id                |
| public       | software_config          | deploy_provider        | text                     | YES         | null            | null              | null                  | null              |
| public       | software_config          | build_command          | text                     | YES         | null            | null              | null                  | null              |
| public       | software_config          | output_directory       | text                     | YES         | null            | null              | null                  | null              |
| public       | software_config          | root_directory         | text                     | YES         | null            | null              | null                  | null              |
| public       | software_config          | env_variables          | jsonb                    | YES         | null            | null              | null                  | null              |
| public       | software_config          | advanced_settings      | jsonb                    | YES         | null            | null              | null                  | null              |
| public       | software_config          | created_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | software_config          | updated_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | software_config          | deleted_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | software_config          | repository_url         | text                     | YES         | null            | null              | null                  | null              |
| public       | software_config          | readme                 | text                     | YES         | null            | null              | null                  | null              |
| public       | software_visits          | id                     | uuid                     | NO          | PRIMARY KEY     | null              | null                  | null              |
| public       | software_visits          | software_id            | uuid                     | YES         | FOREIGN KEY     | public            | softwares             | id                |
| public       | software_visits          | date                   | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | software_visits          | ip_address             | text                     | YES         | null            | null              | null                  | null              |
| public       | software_visits          | user_agent             | text                     | YES         | null            | null              | null                  | null              |
| public       | software_visits          | deleted_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | softwares                | id                     | uuid                     | NO          | PRIMARY KEY     | null              | null                  | null              |
| public       | softwares                | name                   | text                     | NO          | null            | null              | null                  | null              |
| public       | softwares                | domain                 | text                     | YES         | null            | null              | null                  | null              |
| public       | softwares                | status                 | USER-DEFINED             | YES         | null            | null              | null                  | null              |
| public       | softwares                | disk_usage             | integer                  | YES         | null            | null              | null                  | null              |
| public       | softwares                | bandwidth_usage        | integer                  | YES         | null            | null              | null                  | null              |
| public       | softwares                | created_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | softwares                | updated_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | softwares                | team_id                | uuid                     | NO          | FOREIGN KEY     | public            | teams                 | id                |
| public       | softwares                | rls_config             | text                     | YES         | null            | null              | null                  | null              |
| public       | softwares                | accommodation          | text                     | YES         | null            | null              | null                  | null              |
| public       | softwares                | type                   | USER-DEFINED             | NO          | null            | null              | null                  | null              |
| public       | softwares                | deleted_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | softwares                | workspace_id           | uuid                     | NO          | FOREIGN KEY     | public            | workspaces            | id                |
| public       | subscriptions            | id                     | uuid                     | NO          | PRIMARY KEY     | null              | null                  | null              |
| public       | subscriptions            | plan_id                | uuid                     | YES         | FOREIGN KEY     | public            | plans                 | id                |
| public       | subscriptions            | start_date             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | subscriptions            | end_date               | timestamp with time zone | NO          | null            | null              | null                  | null              |
| public       | subscriptions            | auto_renew             | boolean                  | YES         | null            | null              | null                  | null              |
| public       | subscriptions            | status                 | USER-DEFINED             | YES         | null            | null              | null                  | null              |
| public       | subscriptions            | periodicity            | USER-DEFINED             | NO          | null            | null              | null                  | null              |
| public       | subscriptions            | created_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | subscriptions            | updated_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | subscriptions            | stripe_subscription_id | text                     | YES         | null            | null              | null                  | null              |
| public       | subscriptions            | work_units             | integer                  | NO          | null            | null              | null                  | null              |
| public       | subscriptions            | softwares_limit        | integer                  | NO          | null            | null              | null                  | null              |
| public       | subscriptions            | users_limit            | integer                  | NO          | null            | null              | null                  | null              |
| public       | subscriptions            | deleted_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | subscriptions            | workspace_id           | uuid                     | NO          | FOREIGN KEY     | public            | workspaces            | id                |
| public       | support_tickets          | id                     | uuid                     | NO          | PRIMARY KEY     | null              | null                  | null              |
| public       | support_tickets          | user_id                | uuid                     | YES         | FOREIGN KEY     | public            | profiles              | id                |
| public       | support_tickets          | subject                | text                     | NO          | null            | null              | null                  | null              |
| public       | support_tickets          | description            | text                     | NO          | null            | null              | null                  | null              |
| public       | support_tickets          | status                 | USER-DEFINED             | YES         | null            | null              | null                  | null              |
| public       | support_tickets          | priority               | USER-DEFINED             | YES         | null            | null              | null                  | null              |
| public       | support_tickets          | created_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | support_tickets          | updated_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | support_tickets          | deleted_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | support_tickets          | workspace_id           | uuid                     | YES         | FOREIGN KEY     | public            | workspaces            | id                |
| public       | support_tickets          | team_id                | uuid                     | YES         | FOREIGN KEY     | public            | teams                 | id                |
| public       | support_tickets          | assigned_to            | uuid                     | YES         | FOREIGN KEY     | public            | profiles              | id                |
| public       | support_tickets          | tags                   | ARRAY                    | YES         | null            | null              | null                  | null              |
| public       | system_logs              | id                     | uuid                     | NO          | PRIMARY KEY     | null              | null                  | null              |
| public       | system_logs              | user_id                | uuid                     | YES         | FOREIGN KEY     | public            | profiles              | id                |
| public       | system_logs              | action_type            | text                     | NO          | null            | null              | null                  | null              |
| public       | system_logs              | message                | text                     | YES         | null            | null              | null                  | null              |
| public       | system_logs              | metadata               | jsonb                    | YES         | null            | null              | null                  | null              |
| public       | system_logs              | created_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | team_invitations         | id                     | uuid                     | NO          | PRIMARY KEY     | null              | null                  | null              |
| public       | team_invitations         | team_id                | uuid                     | NO          | UNIQUE          | null              | null                  | null              |
| public       | team_invitations         | team_id                | uuid                     | NO          | FOREIGN KEY     | public            | teams                 | id                |
| public       | team_invitations         | email                  | text                     | NO          | UNIQUE          | null              | null                  | null              |
| public       | team_invitations         | token                  | text                     | NO          | null            | null              | null                  | null              |
| public       | team_invitations         | role_id                | uuid                     | NO          | FOREIGN KEY     | public            | member_roles          | id                |
| public       | team_invitations         | invited_by             | uuid                     | YES         | FOREIGN KEY     | public            | profiles              | id                |
| public       | team_invitations         | created_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | team_invitations         | expires_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | team_invitations         | accepted_at            | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | team_invitations         | response               | boolean                  | YES         | null            | null              | null                  | null              |
| public       | team_invitations         | deleted_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | team_members             | id                     | uuid                     | NO          | PRIMARY KEY     | null              | null                  | null              |
| public       | team_members             | team_id                | uuid                     | NO          | FOREIGN KEY     | public            | teams                 | id                |
| public       | team_members             | team_id                | uuid                     | NO          | UNIQUE          | null              | null                  | null              |
| public       | team_members             | user_id                | uuid                     | NO          | UNIQUE          | null              | null                  | null              |
| public       | team_members             | user_id                | uuid                     | NO          | FOREIGN KEY     | public            | profiles              | id                |
| public       | team_members             | joined_at              | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | team_members             | role_id                | uuid                     | YES         | FOREIGN KEY     | public            | member_roles          | id                |
| public       | team_members             | deleted_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | teams                    | id                     | uuid                     | NO          | PRIMARY KEY     | null              | null                  | null              |
| public       | teams                    | name                   | text                     | NO          | null            | null              | null                  | null              |
| public       | teams                    | slug                   | text                     | YES         | null            | null              | null                  | null              |
| public       | teams                    | created_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | teams                    | updated_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | teams                    | deleted_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | teams                    | workspace_id           | uuid                     | NO          | FOREIGN KEY     | public            | workspaces            | id                |
| public       | ticket_attachments       | id                     | uuid                     | NO          | PRIMARY KEY     | null              | null                  | null              |
| public       | ticket_attachments       | ticket_id              | uuid                     | NO          | FOREIGN KEY     | public            | support_tickets       | id                |
| public       | ticket_attachments       | message_id             | uuid                     | YES         | FOREIGN KEY     | public            | ticket_messages       | id                |
| public       | ticket_attachments       | uploader_id            | uuid                     | YES         | FOREIGN KEY     | public            | profiles              | id                |
| public       | ticket_attachments       | file_url               | text                     | NO          | null            | null              | null                  | null              |
| public       | ticket_attachments       | file_name              | text                     | YES         | null            | null              | null                  | null              |
| public       | ticket_attachments       | file_type              | text                     | YES         | null            | null              | null                  | null              |
| public       | ticket_attachments       | file_size              | bigint                   | YES         | null            | null              | null                  | null              |
| public       | ticket_attachments       | created_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | ticket_attachments       | deleted_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | ticket_messages          | id                     | uuid                     | NO          | PRIMARY KEY     | null              | null                  | null              |
| public       | ticket_messages          | ticket_id              | uuid                     | YES         | FOREIGN KEY     | public            | support_tickets       | id                |
| public       | ticket_messages          | message                | text                     | NO          | null            | null              | null                  | null              |
| public       | ticket_messages          | is_from_client         | boolean                  | NO          | null            | null              | null                  | null              |
| public       | ticket_messages          | created_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | ticket_messages          | deleted_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | ticket_messages          | user_id                | uuid                     | YES         | FOREIGN KEY     | public            | profiles              | id                |
| public       | ticket_messages          | is_internal            | boolean                  | YES         | null            | null              | null                  | null              |
| public       | user_integrations        | id                     | uuid                     | NO          | PRIMARY KEY     | null              | null                  | null              |
| public       | user_integrations        | user_id                | uuid                     | NO          | FOREIGN KEY     | public            | profiles              | id                |
| public       | user_integrations        | provider_id            | uuid                     | NO          | FOREIGN KEY     | public            | integration_providers | id                |
| public       | user_integrations        | access_token           | text                     | YES         | null            | null              | null                  | null              |
| public       | user_integrations        | refresh_token          | text                     | YES         | null            | null              | null                  | null              |
| public       | user_integrations        | expires_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | user_integrations        | metadata               | jsonb                    | YES         | null            | null              | null                  | null              |
| public       | user_integrations        | created_at             | timestamp with time zone | NO          | null            | null              | null                  | null              |
| public       | user_integrations        | updated_at             | timestamp with time zone | NO          | null            | null              | null                  | null              |
| public       | user_integrations        | deleted_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | user_preferences         | user_id                | uuid                     | NO          | FOREIGN KEY     | public            | profiles              | id                |
| public       | user_preferences         | user_id                | uuid                     | NO          | PRIMARY KEY     | null              | null                  | null              |
| public       | user_preferences         | language               | text                     | YES         | null            | null              | null                  | null              |
| public       | user_preferences         | timezone               | text                     | YES         | null            | null              | null                  | null              |
| public       | user_preferences         | interface_density      | text                     | YES         | null            | null              | null                  | null              |
| public       | user_preferences         | high_contrast          | boolean                  | YES         | null            | null              | null                  | null              |
| public       | user_preferences         | reduce_motion          | boolean                  | YES         | null            | null              | null                  | null              |
| public       | user_preferences         | created_at             | timestamp with time zone | NO          | null            | null              | null                  | null              |
| public       | user_preferences         | updated_at             | timestamp with time zone | NO          | null            | null              | null                  | null              |
| public       | user_preferences         | deleted_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | user_preferences         | theme                  | text                     | YES         | null            | null              | null                  | null              |
| public       | workspaces               | id                     | uuid                     | NO          | PRIMARY KEY     | null              | null                  | null              |
| public       | workspaces               | company_id             | uuid                     | YES         | FOREIGN KEY     | public            | companies             | id                |
| public       | workspaces               | name                   | text                     | NO          | null            | null              | null                  | null              |
| public       | workspaces               | slug                   | text                     | YES         | UNIQUE          | null              | null                  | null              |
| public       | workspaces               | stripe_customer_id     | text                     | YES         | null            | null              | null                  | null              |
| public       | workspaces               | created_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | workspaces               | updated_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | workspaces               | deleted_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | workunits_usage          | id                     | uuid                     | NO          | PRIMARY KEY     | null              | null                  | null              |
| public       | workunits_usage          | year                   | integer                  | NO          | null            | null              | null                  | null              |
| public       | workunits_usage          | month                  | integer                  | NO          | null            | null              | null                  | null              |
| public       | workunits_usage          | workunits_used         | integer                  | YES         | null            | null              | null                  | null              |
| public       | workunits_usage          | workunits_limit        | integer                  | NO          | null            | null              | null                  | null              |
| public       | workunits_usage          | created_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | workunits_usage          | updated_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | workunits_usage          | deleted_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| public       | workunits_usage          | workspace_id           | uuid                     | NO          | FOREIGN KEY     | public            | workspaces            | id                |
| vault        | secrets                  | id                     | uuid                     | NO          | PRIMARY KEY     | null              | null                  | null              |
| vault        | secrets                  | name                   | text                     | YES         | null            | null              | null                  | null              |
| vault        | secrets                  | description            | text                     | NO          | null            | null              | null                  | null              |
| vault        | secrets                  | secret                 | text                     | NO          | null            | null              | null                  | null              |
| vault        | secrets                  | key_id                 | uuid                     | YES         | null            | null              | null                  | null              |
| vault        | secrets                  | nonce                  | bytea                    | YES         | null            | null              | null                  | null              |
| vault        | secrets                  | created_at             | timestamp with time zone | NO          | null            | null              | null                  | null              |
| vault        | secrets                  | updated_at             | timestamp with time zone | NO          | null            | null              | null                  | null              |
| wedding      | events                   | id                     | uuid                     | NO          | PRIMARY KEY     | null              | null                  | null              |
| wedding      | events                   | workspace_id           | uuid                     | YES         | FOREIGN KEY     | public            | workspaces            | id                |
| wedding      | events                   | title                  | text                     | NO          | null            | null              | null                  | null              |
| wedding      | events                   | description            | text                     | YES         | null            | null              | null                  | null              |
| wedding      | events                   | date                   | timestamp with time zone | NO          | null            | null              | null                  | null              |
| wedding      | events                   | address                | text                     | YES         | null            | null              | null                  | null              |
| wedding      | events                   | google_maps_link       | text                     | YES         | null            | null              | null                  | null              |
| wedding      | events                   | created_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| wedding      | events                   | deleted_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| wedding      | gifts                    | id                     | uuid                     | NO          | PRIMARY KEY     | null              | null                  | null              |
| wedding      | gifts                    | workspace_id           | uuid                     | YES         | FOREIGN KEY     | public            | workspaces            | id                |
| wedding      | gifts                    | transaction_id         | uuid                     | YES         | FOREIGN KEY     | fintech           | transactions          | id                |
| wedding      | gifts                    | name                   | text                     | NO          | null            | null              | null                  | null              |
| wedding      | gifts                    | description            | text                     | YES         | null            | null              | null                  | null              |
| wedding      | gifts                    | image_url              | text                     | YES         | null            | null              | null                  | null              |
| wedding      | gifts                    | price                  | numeric                  | NO          | null            | null              | null                  | null              |
| wedding      | gifts                    | is_quota               | boolean                  | YES         | null            | null              | null                  | null              |
| wedding      | gifts                    | pix_key                | text                     | YES         | null            | null              | null                  | null              |
| wedding      | gifts                    | created_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| wedding      | gifts                    | deleted_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| wedding      | guestbook                | id                     | uuid                     | NO          | PRIMARY KEY     | null              | null                  | null              |
| wedding      | guestbook                | workspace_id           | uuid                     | YES         | FOREIGN KEY     | public            | workspaces            | id                |
| wedding      | guestbook                | sender_name            | text                     | NO          | null            | null              | null                  | null              |
| wedding      | guestbook                | message                | text                     | NO          | null            | null              | null                  | null              |
| wedding      | guestbook                | is_approved            | boolean                  | YES         | null            | null              | null                  | null              |
| wedding      | guestbook                | created_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| wedding      | guestbook                | deleted_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| wedding      | guests                   | id                     | uuid                     | NO          | PRIMARY KEY     | null              | null                  | null              |
| wedding      | guests                   | workspace_id           | uuid                     | YES         | FOREIGN KEY     | public            | workspaces            | id                |
| wedding      | guests                   | name                   | text                     | NO          | null            | null              | null                  | null              |
| wedding      | guests                   | category               | text                     | YES         | null            | null              | null                  | null              |
| wedding      | guests                   | phone                  | text                     | YES         | null            | null              | null                  | null              |
| wedding      | guests                   | email                  | text                     | YES         | null            | null              | null                  | null              |
| wedding      | guests                   | max_companions         | integer                  | YES         | null            | null              | null                  | null              |
| wedding      | guests                   | created_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| wedding      | guests                   | deleted_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| wedding      | sections                 | id                     | uuid                     | NO          | PRIMARY KEY     | null              | null                  | null              |
| wedding      | sections                 | workspace_id           | uuid                     | YES         | FOREIGN KEY     | public            | workspaces            | id                |
| wedding      | sections                 | type                   | text                     | NO          | null            | null              | null                  | null              |
| wedding      | sections                 | order_index            | integer                  | NO          | null            | null              | null                  | null              |
| wedding      | sections                 | content_data           | jsonb                    | NO          | null            | null              | null                  | null              |
| wedding      | sections                 | is_visible             | boolean                  | YES         | null            | null              | null                  | null              |
| wedding      | sections                 | deleted_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| wedding      | site_configs             | workspace_id           | uuid                     | NO          | FOREIGN KEY     | public            | workspaces            | id                |
| wedding      | site_configs             | workspace_id           | uuid                     | NO          | PRIMARY KEY     | null              | null                  | null              |
| wedding      | site_configs             | active_template_id     | text                     | YES         | null            | null              | null                  | null              |
| wedding      | site_configs             | slug                   | text                     | NO          | UNIQUE          | null              | null                  | null              |
| wedding      | site_configs             | site_title             | text                     | YES         | null            | null              | null                  | null              |
| wedding      | site_configs             | site_description       | text                     | YES         | null            | null              | null                  | null              |
| wedding      | site_configs             | og_image_url           | text                     | YES         | null            | null              | null                  | null              |
| wedding      | site_configs             | design_tokens          | jsonb                    | YES         | null            | null              | null                  | null              |
| wedding      | site_configs             | asaas_wallet_id        | text                     | YES         | null            | null              | null                  | null              |
| wedding      | site_configs             | asaas_split_percentage | numeric                  | YES         | null            | null              | null                  | null              |
| wedding      | site_configs             | created_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| wedding      | site_configs             | updated_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |
| wedding      | site_configs             | deleted_at             | timestamp with time zone | YES         | null            | null              | null                  | null              |